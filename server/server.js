const express = require("express");
const oracledb = require("oracledb");
const cors = require("cors");

const app = express();
const PORT = 5003;

// app.use(cors()); // get으로 가져가는 주소만 허용해준 것일 뿐 들어오는 url은 허용을 안 해준 상태.
// 그래서 Get과 Post로 DB에 전달받을 url 주소도 허용할 수 있도록 해야함.
app.use(cors({ origin: "http://localhost:3000" })); // 실행되는 포트번호를 넣어줘야하고 다르면 실행되지 않음.
app.use(express.json());

const dbconfig = {
  user: "swith",
  password: "swith",
  connectString: "localhost:1521/XE",
};

async function selectQuery(sql) {
  let connection;

  try {
    // DB 연결하기
    connection = await oracledb.getConnection(dbconfig);
    const result = await connection.execute(sql);

    return result.rows.map((row) => ({
      ID: row[0],
      NAME: row[1],
      PRICE: row[2],
    }));
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
}

// 연결 잘 됐는지 확인해보기
app.listen(PORT, () => {
  console.log(`서버 시작 : http://localhost:${PORT}`);
});

app.get("/api/cafes", async (request, response) => {
  // 아래 post와 하는 역할이 다르다면 엔드포인트가 같아도 충돌날 일이 없음.
  const cafe = await selectQuery("SELECT * FROM cafe");
  response.json(cafe);
});

// post로 전달받을 쿼리 작성해주기
app.post("/api/cafes", async (request, response) => {
  const { name, price } = request.body;
  console.log("데이터 들어왔는지 확인 : !", { name, price });

  let connection;

  try {
    connection = await oracledb.getConnection(dbconfig);
    await connection.execute(
      "INSERT INTO cafe(ID, NAME, PRICE) VALUES (cafe_seq.NEXTVAL, :name, :price)",
      { name, price },
      { autoCommit: true }
    );

    response.json({ message: "성공적으로 저장되었습니다." });
  } catch (error) {
    console.error("Error in POST / api / cafes", error);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error("커넥션 닫기 에러 :", error);
      }
    }
  }
});

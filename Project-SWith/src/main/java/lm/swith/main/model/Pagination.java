package lm.swith.main.model;

import lombok.*;

@Getter @Setter
public class Pagination {
	int page = 1; // 현재 페이지 기본 값 1
	int size = 6; // 페이지당 게시글 수, 기본 6
	int studyCount; // 전체 게시글 수
	
	public String getQueryString() {
		return String.format("page=%d&size=%d", page, size);
	}
}

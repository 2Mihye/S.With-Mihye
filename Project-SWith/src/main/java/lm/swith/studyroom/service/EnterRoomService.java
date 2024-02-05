package lm.swith.studyroom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import lm.swith.studyroom.model.MessageResponseDto;
import lm.swith.studyroom.utils.MessageIdGenerator;

@Service
public class EnterRoomService {
    @Autowired
    private SimpMessagingTemplate template;

    public void enterRoom(String type,
                          Long roomId,
                          Long userId) {
        template.convertAndSend(
            "/subscription/chat/room/" + roomId,
            new MessageResponseDto(
                MessageIdGenerator.generateId(),
                type,
                "사용자 " + userId + " 님이 "
                    + "채팅방 " + roomId + "에 입장하셨습니다."
            )
        );
    }
}
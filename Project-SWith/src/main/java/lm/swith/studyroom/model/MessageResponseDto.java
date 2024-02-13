package lm.swith.studyroom.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class MessageResponseDto { // 받는 곳이니깐 DB없어도 괜찮음
    private final Long id;

    private final String type;

    private final String value;

}
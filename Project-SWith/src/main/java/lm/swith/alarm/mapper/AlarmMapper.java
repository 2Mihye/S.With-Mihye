package lm.swith.alarm.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import lm.swith.alarm.model.Alarm;

@Mapper
public interface AlarmMapper {

	void insertAlarm(Alarm alarm); 
	
	List<Alarm> getAlarmByUserNo(Long user_no);
	
	boolean AlarmByData(@Param("user_no") Long user_no, @Param("post_no") Long post_no, @Param("alarm_message") String alarm_message);
	
	void deleteAlarm(Long alarm_no);
}

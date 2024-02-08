package lm.swith.alarm.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import lm.swith.alarm.model.Alarm;

@Mapper
public interface AlarmMapper {

	void insertAlarm(Alarm alarm); 
	
	List<Alarm> getAlarmByUserNo(Long user_no);
}
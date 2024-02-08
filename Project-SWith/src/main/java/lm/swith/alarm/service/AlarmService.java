package lm.swith.alarm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lm.swith.alarm.mapper.AlarmMapper;
import lm.swith.alarm.model.Alarm;

@Service
public class AlarmService {
	
	@Autowired
	private AlarmMapper alarmMapper;
	
	
	public void InsertAlarm(Alarm alarm) {
		alarmMapper.insertAlarm(alarm);
	}
	
	public List<Alarm> getAlarmByUserNo(Long user_no){
		return alarmMapper.getAlarmByUserNo(user_no);
	}
}
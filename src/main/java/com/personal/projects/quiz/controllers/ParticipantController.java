package com.personal.projects.quiz.controllers;

import com.personal.projects.quiz.models.Participant;
import com.personal.projects.quiz.services.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/participant")
public class ParticipantController {

    @Autowired
    public ParticipantService participantService;

    @GetMapping(value="/{id}")
    public Optional<Participant> getParticipant(@PathVariable Integer id) {
        return participantService.findById(id);
    }

    @DeleteMapping(value="/{id}")
    public Integer deleteParticipant(@PathVariable Integer id) {
        return participantService.delete(id);
    }

    @GetMapping(value="/quiz/{id}")
    public List<Participant> getParticipantsByQuizId(@PathVariable Integer id) {
        return participantService.findByQuizId(id);
    }

    @PostMapping(value="/quiz/{id}")
    public Participant inviteParticipantsByQuizId(@RequestBody Participant participant) {
        return participantService.save(participant);
    }

    @PostMapping(value="/quiz/{id}/save-participation")
    public Participant saveParticipation(@RequestBody Participant participant) {
        return participantService.saveParticipation(participant);
    }

    @PostMapping(value="/quiz/{id}/resend-invitation")
    public Participant reSendInvitation(@RequestBody Participant participant) {
        return participantService.resendInvitation(participant);
    }

    @GetMapping(value="/quiz/{id}/pending-participants")
    public List<Participant> getPendingParticipantsByQuizId(@PathVariable Integer id) {
        return participantService.findByQuizIdAndParticipationDateIsNull(id);
    }

    @GetMapping(value="/token/{token}")
    public Participant getParticipantByTokenAndQuizId(@PathVariable String token) {
        return participantService.findByTokenAndAndParticipationDateIsNull(token);
    }

    @GetMapping(value="/quiz/{id}/response/history")
    public List<?> getParticipationDateCount(@PathVariable Integer id) {
        return participantService.findParticipationDateCount(id);
    }

    @GetMapping(value="/quiz/{id}/average/time")
    public Integer getAverageTime(@PathVariable Integer id) {
        return participantService.averageTimeByQuizId(id);
    }

    @GetMapping(value="/quiz/{id}/average/completion")
    public Double getAverageCompletion(@PathVariable Integer id) {
        return participantService.averageCompletionByQuizId(id);
    }

    @GetMapping(value="/quiz/{id}/average/success")
    public Double getAverageSuccess(@PathVariable Integer id) {
        return participantService.averageSuccessByQuizId(id);
    }
}

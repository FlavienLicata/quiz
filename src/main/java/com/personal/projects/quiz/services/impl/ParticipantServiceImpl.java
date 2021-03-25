package com.personal.projects.quiz.services.impl;

import com.personal.projects.quiz.models.Participant;
import com.personal.projects.quiz.repository.ParticipantRepository;
import com.personal.projects.quiz.services.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ParticipantServiceImpl implements ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;
    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String from;

    private static final SecureRandom secureRandom = new SecureRandom(); //threadsafe
    private static final Base64.Encoder base64Encoder = Base64.getUrlEncoder(); //threadsafe

    @Override
    public Optional<Participant> findById(Integer id) {
        Optional<Participant> participant = null;
        try {
            participant = participantRepository.findById(id);
        } catch (Exception e) {
            throw e;
        }
        return participant;
    }

    @Override
    public Participant findByTokenAndAndParticipationDateIsNull(String token) {
        Participant participant = null;
        try {
            participant = participantRepository.findByTokenAndAndParticipationDateIsNull(token);
        } catch (Exception e) {
            throw e;
        }
        return participant;
    }

    @Override
    public List<Participant> findByQuizId(Integer quizId) {
        List<Participant> participants = null;
        try {
            participants = participantRepository.findByQuizId(quizId);
        } catch (Exception e) {
            throw e;
        }
        return participants;
    }

    @Override
    public List<Participant> findByQuizIdAndParticipationDateIsNull(Integer quizId) {
        List<Participant> participants = null;
        try {
            participants = participantRepository.findByQuizIdAndParticipationDateIsNull(quizId);
        } catch (Exception e) {
            throw e;
        }
        return participants;
    }

    @Override
    public List<?> findParticipationDateCount(Integer quizId) {
        List<?> participants = null;
        try {
            participants = participantRepository.findParticipationDateCount(quizId);
        } catch (Exception e) {
            throw e;
        }
        return participants;
    }

    @Override
    public Integer averageTimeByQuizId(Integer quizId) {
        Integer averageTime = null;
        try {
            averageTime = participantRepository.averageTimeByQuizId(quizId);
        } catch (Exception e) {
            throw e;
        }
        return averageTime;
    }

    @Override
    public Double averageCompletionByQuizId(Integer quizId) {
        Double averageCompletion = null;
        try {
            averageCompletion = participantRepository.averageCompletionByQuizId(quizId);
        } catch (Exception e) {
            throw e;
        }
        return averageCompletion;
    }

    @Override
    public Double averageSuccessByQuizId(Integer quizId) {
        Double averageSuccess = null;
        try {
            averageSuccess = participantRepository.averageSuccessByQuizId(quizId);
        } catch (Exception e) {
            throw e;
        }
        return averageSuccess;
    }

    @Override
    public Participant save(Participant participant) {
        Date currentDate = new Date();
        participant.setInvitationDate(LocalDate.of(currentDate.getYear(), currentDate.getMonth(), currentDate.getDay())).setToken(generateNewToken());
        participantRepository.save(participant);

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(from);
        msg.setTo(participant.getEmail());

        msg.setSubject("Invitation au Quiz");
        msg.setText("Vous avez été invité à participer au Quiz sur Les Jeux Olympiques \n" +
                "Veuillez y participer en cliquant sur le lien suivant : " + participant.getToken());

        try {
            javaMailSender.send(msg);
        } catch (Exception e) {
            participantRepository.delete(participant);
        }
        return participant;
    }

    @Override
    public Participant saveParticipation(Participant participant) {
        Date currentDate = new Date();
        participant.setParticipationDate(LocalDate.of(currentDate.getYear(), currentDate.getMonth(), currentDate.getDay()));
        participantRepository.save(participant);
        return participant;
    }

    @Override
    public Participant resendInvitation(Participant participant) {
        Date currentDate = new Date();
        participant.setRelanceDate(LocalDate.of(currentDate.getYear(), currentDate.getMonth(), currentDate.getDay()));

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(from);
        msg.setTo(participant.getEmail());

        msg.setSubject("Rappel : Votre invitation au Quiz");
        msg.setText("Rappel : Vous avez été précédemment invité à participer au Quiz sur Les Jeux Olympiques \n" +
                "N'oubliez pas d'y participer \n" +
                "Pour cela, cliquez sur le lien suivant : " + participant.getToken());

        try {
            javaMailSender.send(msg);
        } catch (Exception e) {
            System.err.println("Exception relance de mail: " + e.getMessage());
        }
        this.participantRepository.save(participant);
        return participant;
    }

    @Override
    public Integer delete(Integer participantId) {
        participantRepository.deleteById(participantId);
        return participantId;
    }

    private static String generateNewToken() {
        byte[] randomBytes = new byte[24];
        secureRandom.nextBytes(randomBytes);
        return base64Encoder.encodeToString(randomBytes);
    }

}

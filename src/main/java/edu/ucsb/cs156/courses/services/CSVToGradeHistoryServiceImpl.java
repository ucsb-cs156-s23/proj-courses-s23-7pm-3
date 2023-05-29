package edu.ucsb.cs156.courses.services;

import edu.ucsb.cs156.courses.entities.GradeHistory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

import java.io.FileReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.CSVReader;

@Slf4j
@Service
public class CSVToGradeHistoryServiceImpl implements CSVToGradeHistoryService {

    @Override
    public List<GradeHistory> parse(Reader reader) throws Exception {
        List<GradeHistory> gradeHistoryList = new ArrayList<GradeHistory>();
        log.info("Parsing CSV file with grade history... ");
        CSVReader csvReader = new CSVReader(reader);
        List<String[]> myEntries = csvReader.readAll();
        for (String[] row : myEntries) {
            GradeHistory gradeHistory =  GradeHistory.builder()
            .year(row[0])
            .quarter(row[1])
            .level(row[2])
            .subjectArea(row[3])
            .course(row[4])
            .instructor(row[5])
            .gradeGiven(row[6])
            .sumofStudentCount(Integer.parseInt(row[7]))
            .build();
            log.info("Parsed: " + gradeHistory.toString());
            gradeHistoryList.add(gradeHistory);
        }
        csvReader.close();
        return gradeHistoryList;
    }

}
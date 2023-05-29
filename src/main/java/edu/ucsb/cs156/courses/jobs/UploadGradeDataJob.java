package edu.ucsb.cs156.courses.jobs;

import java.util.ArrayList;
import java.util.List;

import edu.ucsb.cs156.courses.entities.GradeHistory;
import edu.ucsb.cs156.courses.repositories.GradeHistoryRepository;

import edu.ucsb.cs156.courses.services.UCSBGradeHistoryServiceImpl;
import edu.ucsb.cs156.courses.services.jobs.JobContext;
import edu.ucsb.cs156.courses.services.jobs.JobContextConsumer;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
import java.util.Optional;


import edu.ucsb.cs156.courses.collections.ConvertedSectionCollection;
import edu.ucsb.cs156.courses.documents.ConvertedSection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
public class UploadGradeDataJob implements JobContextConsumer {
    @Getter
    private UCSBGradeHistoryServiceImpl UCSBGradeHistoryServiceImpl;
    @Getter
    private GradeHistoryRepository gradeHistoryRepository;

    @Override
    public void accept(JobContext ctx) throws Exception {
        ctx.log("Updating UCSB Grade History Data");
        List<String> urls = UCSBGradeHistoryServiceImpl.getUrls();
        ctx.log("Here is correct!");
        GradeHistory previous = new GradeHistory();
        List<GradeHistory> results = null;
        ctx.log("Here is correct too!");
        for (String url : urls) {
            results = UCSBGradeHistoryServiceImpl.getGradeData(url);
            ctx.log(results.toString());
            GradeHistory topRow = results.get(0);
            ctx.log(topRow.toString());
            upsertAll(gradeHistoryRepository, results,ctx);
            ctx.log("Here is correct too too!");
            logProgress(ctx, topRow, previous);
        }

        ctx.log("Finished updating UCSB Grade History Data");
    }

    private void logProgress(JobContext ctx, GradeHistory topRow, GradeHistory previous) {
        if (!topRow.getYyyyq().equals(previous.getYyyyq())) {
            ctx.log("Processing data for year: " + topRow.getYyyyq());
            previous.setYyyyq(topRow.getYyyyq());
        }
        ctx.log("Processing data for subjectArea: " + topRow.getSubjectArea());
    }

    public static List<GradeHistory> upsertAll(
            GradeHistoryRepository gradeHistoryRepository,
            List<GradeHistory> gradeHistories,JobContext ctx){
        List<GradeHistory> result = new ArrayList<GradeHistory>();
        for (GradeHistory gradeHistory : gradeHistories) {
            List<GradeHistory> query = gradeHistoryRepository.findByYyyyqAndCourseAndInstructorAndGrade(
                    gradeHistory.getYyyyq(), gradeHistory.getCourse(), gradeHistory.getInstructor(),
                    gradeHistory.getGrade());
                ctx.log("hello"+query.toString());
            if (query.size() == 0) {
                ctx.log("Finished updating UCSB Grade History Data1");
                ctx.log(gradeHistory.toString());
                gradeHistoryRepository.save(gradeHistory);
                ctx.log("Finished updating UCSB Grade History Data11");
                result.add(gradeHistory);
            } else {
                GradeHistory existing = query.get(0);
                existing.setCount(gradeHistory.getCount());
                ctx.log("Finished updating UCSB Grade History Data2");
                existing = gradeHistoryRepository.save(existing);
                result.add(existing);
            }
        }
        return result;
    }
}
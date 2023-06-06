import { useState } from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CourseOverTimeSearchForm from "main/components/BasicCourseSearch/CourseOverTimeSearchForm";
import { useBackendMutation } from "main/utils/useBackend";
import SectionsOverTimeTable from "main/components/Sections/SectionsOverTimeTable";

export default function CourseOverTimeIndexPage() {
  // Stryker disable next-line all : Can't test state because hook is internal
  const [courseJSON, setCourseJSON] = useState([]);

  const objectToAxiosParams = (query) => ({
    url: "/api/public/courseovertime/search",
    params: {
      startQtr: query.startQuarter,
      endQtr: query.endQuarter,
      subjectArea: query.subject,
      courseNumber: query.courseNumber + query.courseSuf,
    },
  });

  const onSuccess = (result) => {
    setCourseJSON(result);
  };

  const mutation = useBackendMutation(
    objectToAxiosParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    []
  );

  async function fetchCourseOverTimeJSON(_event, query) {
    mutation.mutate(query);
  }
  console.log("courseJSON=", courseJSON)
  return (
    <BasicLayout>
      <div className="pt-2">
        <h5>Welcome to the UCSB Course History Search!</h5>
        <CourseOverTimeSearchForm fetchJSON={fetchCourseOverTimeJSON} />
        {
          courseJSON?.count > 0 && <p>Courses found.</p>  &&<SectionsOverTimeTable sections={courseJSON.results} />
        }
        {
          courseJSON?.count === 0 && <p>No courses found.</p>        
        }
      </div>
    </BasicLayout>
  );
}
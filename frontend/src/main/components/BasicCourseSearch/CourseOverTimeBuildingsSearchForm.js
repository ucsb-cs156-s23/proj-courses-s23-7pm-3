import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

//import { allTheLevels } from "fixtures/levelsFixtures";
import { quarterRange } from "main/utils/quarterUtilities";

import { useSystemInfo } from "main/utils/systemInfo";
import SingleQuarterDropdown from "../Quarters/SingleQuarterDropdown";

const CourseOverTimeBuildingsSearchForm = ({ fetchJSON }) => {

  const { data: systemInfo } = useSystemInfo();

  // Stryker disable OptionalChaining
  const startQtr = systemInfo?.startQtrYYYYQ || "20211";
  const endQtr = systemInfo?.endQtrYYYYQ || "20214";
  // Stryker enable OptionalChaining

  const quarters = quarterRange(startQtr, endQtr);

  // Stryker disable all : not sure how to test/mock local storage
  const localStartQuarter = localStorage.getItem("CourseOverTimeBuildingsSearch.StartQuarter");
  const localEndQuarter = localStorage.getItem("CourseOverTimeBuildingsSearch.EndQuarter");
  const localBuildingCode = localStorage.getItem("CourseOverTimeBuildingsSearch.BuildingCode")

  const [startQuarter, setStartQuarter] = useState(localStartQuarter || quarters[0].yyyyq);
  const [endQuarter, setEndQuarter] = useState(localEndQuarter || quarters[0].yyyyq);
  const [buildingCode, setBuildingCode] = useState(localBuildingCode || "")
    
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchJSON(event, { startQuarter, endQuarter, buildingCode });
  };

  const handleBuildingCodeOnChange = (event) => {
    setBuildingCode(event.target.value);
  };

  // Stryker disable all : Stryker is testing by changing the padding to 0. But this is simply a visual optimization as it makes it look better
  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Col md="auto">
            <SingleQuarterDropdown
              quarters={quarters}
              quarter={startQuarter}
              setQuarter={setStartQuarter}
              controlId={"CourseOverTimeBuildingsSearch.StartQuarter"}
              label={"Start Quarter"}
            />
          </Col>
          <Col md="auto">
            <SingleQuarterDropdown
              quarters={quarters}
              quarter={endQuarter}
              setQuarter={setEndQuarter}
              controlId={"CourseOverTimeBuildingsSearch.EndQuarter"}
              label={"End Quarter"}
            />
          </Col>
          <Col md="auto">
            <Form.Group controlId="CourseOverTimeBuildingsSearch.BuildingCode">
              <Form.Label>Building Code</Form.Label>
              <Form.Control onChange={handleBuildingCodeOnChange} defaultValue={buildingCode} />
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Col md="auto">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default CourseOverTimeBuildingsSearchForm;
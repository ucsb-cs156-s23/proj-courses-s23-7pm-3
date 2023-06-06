import { render, screen } from "@testing-library/react";
import SectionsTableBase from "main/components/SectionsTableBase";
import { columns, noSections, hasOneSection } from 'fixtures/sectionBaseFixtures'


describe("SectionsTableBase tests", () => {

    test("renders an empty table without crashing", () => {
        render(
            <SectionsTableBase columns={columns} data={[]} />
        );
    });

    test("does not render plus button when there are no sections", () => {
        render(
            <SectionsTableBase columns={columns} data={noSections} />
        );

        const courseid = screen.getByText("test-courseid");
        expect(courseid.children[0].textContent).toBe('');
    });

    test("renders plus button when there are sections", () => {
        render(
            <SectionsTableBase columns={columns} data={hasOneSection} />
        );

        const courseid = screen.getByText("test-courseid");
        expect(courseid.children[0].textContent).toBe('➕ ');
        expect(screen.getByTestId("testid-cell-row-0-col-courseInfo.courseId")).toHaveAttribute("style", "background: rgb(229, 252, 244); font-weight: bold;");
    });
})
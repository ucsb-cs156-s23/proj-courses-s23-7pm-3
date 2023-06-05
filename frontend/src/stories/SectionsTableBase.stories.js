
import React from 'react';

import SectionsTableBase from "main/components/SectionsTableBase";
import { columns, noSections, hasOneSection } from 'fixtures/sectionBaseFixtures'

export default {
    title: 'components/SectionsTableBase',
    component: SectionsTableBase
};

const Template = (args) => {
    return (
        <SectionsTableBase {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    columns: [],
    data: []
};

export const NoSections = Template.bind({});

NoSections.args = {
    columns: columns,
    data: noSections
};

export const OneSection = Template.bind({});

OneSection.args = {
    columns: columns,
    data: hasOneSection
};
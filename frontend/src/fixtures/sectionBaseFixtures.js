export const columns = [
    // SectionsTableBase tries to get row.allCells[3], so this table needs at least four columns
    // It also groups by courseInfo.courseId, so having that is also required
    {
        Header: 'Course ID',
        accessor: 'courseInfo.courseId',

        Cell: ({ cell: { value } }) => `${value}`
    },
    {
        Header: 'Column 2',
        accessor: 'col2',
        disableGroupBy: true,

        aggregate: values => values[0],
        Aggregated: ({ cell: { value } }) => `${value}`
    },
    {
        Header: 'Column 3',
        accessor: 'col3',
        disableGroupBy: true,

        aggregate: values => values[0],
        Aggregated: ({ cell: { value } }) => `${value}`
    },
    {
        Header: 'Column 4',
        accessor: 'col4',
        disableGroupBy: true,

        aggregate: values => values[0],
        Aggregated: ({ cell: { value } }) => `${value}`
    },
];

export const noSections = [
    {
        "courseInfo": {
            "courseId": "test-courseid"
        },
        "col2": "other data"
    }
]

export const hasOneSection = [
    {
        "courseInfo": {
            "courseId": "test-courseid"
        },
        "col2": "other data 2",
        "col3": "other data 3",
        "col4": "other data 4"
    },
    {
        "courseInfo": {
            "courseId": "test-courseid"
        },
        "col2": "some other data 2",
        "col3": "some other data 3",
        "col4": "some other data 4"
    }
]

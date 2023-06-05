export const columns = [
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
            "courseId": "sample courseid"
        },
        "col2": "other data"
    }
]

export const hasOneSection = [
    {
        "courseInfo": {
            "courseId": "sample courseid"
        },
        "col2": "other data",
        "col3": "other data",
        "col4": "other data"
    },
    {
        "courseInfo": {
            "courseId": "sample courseid"
        },
        "col2": "some other data",
        "col3": "some other data",
        "col4": "some other data"
    }
]

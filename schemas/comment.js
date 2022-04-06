export default {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      name: "postedBy",
      title: "postedBy",
      type: "postedBy",
    },
    {
      name: "comment",
      title: "Comment",
      type: "string",
    },
    {
      name: "date",
      title: "date",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
        calendarTodayLabel: "Today",
      },
    },
  ],
};

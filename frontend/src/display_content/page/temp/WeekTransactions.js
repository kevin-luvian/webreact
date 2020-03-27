const WeekTransactions = [
  {
    date: new Date(2020, 2, 23),
    transactions: [
      {
        key: 1,
        name: "Joe James",
        date: new Date(2020, 2, 23),
        type: true,
        category: { title: "Beverage", color: "grey" },
        value: 100000,
        account: { title: "Bank", color: "green" }
      },
      {
        key: 2,
        name: "John Walsh",
        date: new Date(2020, 2, 23),
        type: false,
        category: { title: "Utility", color: "orange" },
        value: 100000,
        account: { title: "Cash", color: "green" }
      }
    ]
  },
  {
    date: new Date(2020, 2, 24),
    transactions: [
      {
        key: 1,
        name: "Joe James",
        date: new Date(2020, 2, 24),
        type: true,
        category: { title: "Beverage", color: "grey" },
        value: 100000,
        account: { title: "Bank", color: "green" }
      },
      {
        key: 2,
        name: "John Walsh",
        date: new Date(2020, 2, 24),
        type: true,
        category: { title: "Food", color: "crimson" },
        value: 100000,
        account: { title: "Cash", color: "green" }
      }
    ]
  },
  {
    date: new Date(2020, 2, 25),
    transactions: []
  },
  {
    date: new Date(2020, 2, 26),
    transactions: []
  },
  {
    date: new Date(2020, 2, 27),
    transactions: [
      {
        key: 1,
        name: "Joe James",
        date: new Date(2020, 2, 27),
        type: true,
        category: { title: "Beverage", color: "grey" },
        value: 100000,
        account: { title: "Bank", color: "green" }
      }
    ]
  },
  {
    date: new Date(2020, 2, 28),
    transactions: []
  },
  {
    date: new Date(2020, 2, 29),
    transactions: []
  }
];

export default WeekTransactions;

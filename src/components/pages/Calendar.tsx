import { useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import "./Calendar.css";
import { useQuery } from "react-query";
import { getAllTransactions } from "../../service/TransactionService";

const Calendar: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<number>(1)
    const {data, isLoading} = useQuery({
        queryFn: getAllTransactions,
        queryKey: ["transactions"]
    })

  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const monthToString = (month: number) => {
    switch (month) {
      case 0:
        return "Jan";
      case 1:
        return "Feb";
      case 2:
        return "Mar";
      case 3:
        return "Apr";
      case 4:
        return "May";
      case 5:
        return "Jun";
      case 6:
        return "Jul";
      case 7:
        return "Aug";
      case 8:
        return "Sep";
      case 9:
        return "Oct";
      case 10:
        return "Nov";
      case 11:
        return "Dec";
    }
  };

  const handleDecrementMonth = () => {
    let newDate: Date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(newDate);
  };

  const handleIncrementMonth = () => {
    let newDate: Date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(newDate);
  };

  const getDaysOfMonth = () => {
    let tempDate: Date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    tempDate.setDate(0);
    return tempDate.getDate();
  };

  const getFirstOfMonthWeekDay = () => {
    let tempDate: Date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    tempDate.setDate(1);
    return tempDate.getDay();
  };

  const getLastOfMonthWeekDay = () => {
    let tempDate: Date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    tempDate.setDate(0);
    return tempDate.getDay();
  };

  const getWeeksOfMonth = () => {
    const days: number = getDaysOfMonth();
    const firstOfMonthWeekDay: number = getFirstOfMonthWeekDay();
    const lastOfMonthWeekDay: number = getLastOfMonthWeekDay();
    const remainingDaysLastWeek: number = 6 - lastOfMonthWeekDay + 1;
    const totalDays = days + firstOfMonthWeekDay + remainingDaysLastWeek;
    return Math.floor(totalDays / 7);
  };

  const getDay = (date: Date) => {
    let newDate = new Date(date);
    return newDate.getDate();
  }

  return (
    <Container style={{ maxWidth: "800px" }}>
        <Row>
        <p>Den {selectedDay}:e dras följande: </p>
        {data && data.map(transaction => {
            
            if(transaction.transactionDate && new Date(transaction.transactionDate).getDate() == selectedDay)return <p>{transaction.title} - {transaction.amount}kr</p>
        })}
      </Row>
      <Row className="d-flex justify-content-between my-5">
        <Button className="w-auto" onClick={handleDecrementMonth}>
          {"<<"} Previous month
        </Button>
        <p className="w-auto">
          {monthToString(currentDate.getMonth())} - {currentDate.getFullYear()}
        </p>
        <Button className="w-auto" onClick={handleIncrementMonth}>
          Next month {">>"}
        </Button>
      </Row>
      <Row className="shadow pt-5">
        <Table className="">
          <thead>
            <tr>
              <th className="col-1 text-center">Sun</th>
              <th className="col-1 text-center">Mon</th>
              <th className="col-1 text-center">Tue</th>
              <th className="col-1 text-center">Wed</th>
              <th className="col-1 text-center">Thu</th>
              <th className="col-1 text-center">Fri</th>
              <th className="col-1 text-center">Sat</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: getWeeksOfMonth() }).map((week, index) => {
              let currentWeek = index;
              const firstOfMonthWeekDay = getFirstOfMonthWeekDay();
              return (
                <tr>
                  {Array.from({ length: 7 }).map((item, index) => {
                    let value: number = 0;
                    if (currentWeek === 0 && firstOfMonthWeekDay > index)
                      value = 0;
                    else {
                      value = index + 1 + currentWeek * 7 - firstOfMonthWeekDay;
                    }
                    const incomeThisDay = data && data.filter(transaction => getDay(transaction.transactionDate!) === value && transaction.transactionType === 0).reduce((prev, transaction) => prev + transaction.amount, 0)
                    const outgoingThisDay = data && data.filter(transaction => getDay(transaction.transactionDate!) === value && transaction.transactionType === 1).reduce((prev, transaction) => prev + transaction.amount, 0)
                    if(value ===1) console.log(incomeThisDay)
                    return (
                      <td className="cell-styling text-center cursor-pointer"
                      onClick={() => setSelectedDay(value)}>
                        <span>{value === 0
                          ? ""
                          : value > getDaysOfMonth()
                          ? ""
                          : value}
                          </span><br/>
                            <span className="text-success">{incomeThisDay && incomeThisDay > 0 ? "+" + incomeThisDay: ""}</span><br/>
                            <span className="text-danger">{outgoingThisDay && outgoingThisDay > 0 ? "-" + outgoingThisDay: ""}</span><br/>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default Calendar;

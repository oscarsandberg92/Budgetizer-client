import { useQuery } from "react-query";
import { getAllTransactions } from "../../service/TransactionService";
import { Button, Container, Row } from "react-bootstrap";
import Modal_AddTransaction from "../organisms/Modal-AddTransaction/Modal_AddTransaction";
import { useState } from "react";

const Overview: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const {data, isLoading} = useQuery({
        queryFn: getAllTransactions,
        queryKey: ["transactions"]
    })

    const getIncoming = () =>{
        if(!data) return 0;
        return data.filter(t => t.transactionType === 0).reduce((prev, next) => {return prev + next.amount}, 0)
    }

    const getOutgoing = () =>{
        if(!data) return 0;
        return data.filter(t => t.transactionType === 1).reduce((prev, next) => {return prev + next.amount}, 0)
    }

    const getRemainingBalance = () => {
        return getIncoming() - getOutgoing();
    }

    const handleShowModal = (value: boolean) => {
        setShowModal(value);
    }

    if(isLoading) return <h1>Laddar</h1>
    if(data) return (
        <Container style={{maxWidth: "800px"}}>
            <Modal_AddTransaction closeModal={handleShowModal} show={showModal}/>
            <Row className="d-flex justify-content-between">
                <h1 className="w-auto">Overview</h1>
                <Button onClick={() => handleShowModal(true)} className="w-auto h-auto my-auto">+Add new</Button>
            </Row>
            <hr/>
            <h3>Incoming</h3>
            <hr/>
            <h4>- Montly</h4>
            {data.length > 0 && data.filter(t => t.transactionType === 0).map(transaction => <p>{transaction.title} - {transaction.amount}kr</p>)}
            <hr/>
            <h4>- Anual</h4>
            {data.length > 0 && data.filter(t => t.transactionType === 0).map(transaction => <p>{transaction.title} - {transaction.amount}kr</p>)}
            <hr/>
            <h3>Outgoing</h3>
            {data.length > 0 && data.filter(t => t.transactionType === 1).map(transaction => <p>{transaction.title} - {transaction.amount}kr</p>)}
            <hr/>
            <p><strong>Total: </strong>{getRemainingBalance()}</p>
        </Container>
    )
    return(
        <h1>Fel</h1>
    )
}

export default Overview;
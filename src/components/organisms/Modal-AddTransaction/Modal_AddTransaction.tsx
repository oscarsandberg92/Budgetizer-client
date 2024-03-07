import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { Transaction } from "../../../models/Transaction";
import { postTransaction } from "../../../service/TransactionService";

interface Modal_AddTransactionProps{
    show: boolean;
    closeModal: (value: boolean) => void;
}

const Modal_AddTransaction: React.FC<Modal_AddTransactionProps> = (props) => {
    const initialTransaction: Transaction = {
        id: 0,
        title: "",
        amount: 0,
        transactionDate: new Date(),
        interval: 0,
        transactionType: 0
    }
    const [transaction, setTransaction] = useState<Transaction>(initialTransaction)

    const handleSubmit = async (e?: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
        console.log(transaction)
        e && e.preventDefault();
        if(!isTransactionValid()) {
            alert("Validation error");
            return;
        }

        const result = await postTransaction(transaction);
        if(!result) {
            alert("Something went wrong")
        }
        else{
            alert("Transaction added!")
            props.closeModal(false)
        }
    }

    const isTransactionValid = () => {
        return transaction.title !== "" && transaction.amount > 0
    }

    const handleChangeTitle = (value: string) => {
        let temp = {...transaction};
        temp.title = value;
        setTransaction(temp);
    }

    const handleChangeAmount = (value: string) => {
        let parseResult: number = parseInt(value);
        let temp = {...transaction};
        if(Number.isInteger(parseResult)) {
            temp.amount = parseResult;
        }
        else{
            temp.amount = 0;
        }
        setTransaction(temp);
    }

    const handleChangeTransactionType = (value: number) => {
        let temp = {...transaction};
        temp.transactionType = value;
        setTransaction(temp);
    }

    const handleChangeInterval = (value: number) => {
        let temp = {...transaction};
        temp.interval = value;
        setTransaction(temp);
    }

    const handleChangeDate = (value: string) => {
        let temp = {...transaction};
        temp.transactionDate = new Date(value);
        setTransaction(temp);
    }

    return (
        <Modal onHide={() => props.closeModal(false)} show={props.show}>
            <Modal.Header>New transaction</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control required onChange={(e) => handleChangeTitle(e.target.value)} value={transaction.title} type="text" placeholder="Enter Title"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control required onChange={(e) => handleChangeAmount(e.target.value)} value={transaction.amount.toString()} type="number" placeholder="Enter Amount"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Transaction type</Form.Label>
                        <Form.Select onChange={(e) => handleChangeTransactionType(parseInt(e.target.value))}>
                            <option value={0}>Incoming</option>
                            <option value={1}>Outgoing</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Interval</Form.Label>
                        <Form.Select onChange={(e) => handleChangeInterval(parseInt(e.target.value))}>
                            <option value={0}>Monthly</option>
                            <option value={1}>Annually</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>First charging date</Form.Label>
                        <Form.Control onChange={(e) => handleChangeDate(e.target.value)} value={transaction.transactionDate?.toISOString().substring(0,10)} type="date" placeholder="Enter Amount"/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.closeModal(false)}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Modal_AddTransaction;
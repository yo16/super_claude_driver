/**
 * TicketTable component
 * @param ticketTableProps - TicketTableProps
 * @returns TicketTable component
 */

import React from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from "@mui/material";
import { useState } from "react";

import type { Ticket } from "./TicketTableSet";


interface TicketTableProps {
    tickets: Ticket[];
    onSelectTicket: (ticket: Ticket) => void;
}

//const sampleTickets: Ticket[] = [
//  { ticketNo: "T001", filePath: "/files/t1.txt", status: "todo" },
//  { ticketNo: "T002", filePath: "/files/t2.txt", status: "done" },
//  { ticketNo: "T003", filePath: "/files/t3.txt", status: "todo" },
//];

export const TicketTable: React.FC<TicketTableProps> = (ticketTableProps: TicketTableProps) => {
    const { tickets, onSelectTicket } = ticketTableProps;
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const handleRowClick = (ticket: Ticket) => {
        // ここで任意の処理を呼び出す
        //alert(`選択されたチケット: ${ticket.ticketNo}`);
        setSelectedTicket(ticket);
        onSelectTicket(ticket);
    };

    return (
        <>
        <TableContainer
            component={Paper}
            style={{ maxHeight: 400 }}
        >
            <Table stickyHeader>
                <TableHead
                    style={{
                        backgroundColor: "lightblue"
                    }}
                >
                    <TableRow>
                        <TableCell
                            style={{
                                backgroundColor: "#aca",
                            }}
                        >チケット番号</TableCell>
                        <TableCell
                            style={{
                                backgroundColor: "#aca",
                            }}
                        >ファイルパス</TableCell>
                        <TableCell
                            style={{
                                backgroundColor: "#aca",
                            }}
                        >状態</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickets.map(ticket => {
                        const isSelected = selectedTicket?.ticketNo === ticket.ticketNo;
                        const isDone = ticket.status === "DONE";

                        return (
                            <TableRow
                                key={ticket.ticketNo}
                                hover
                                onClick={() => handleRowClick(ticket)}
                                selected={isSelected}
                                style={{
                                    cursor: "pointer",
                                    backgroundColor: isSelected ? "lightblue" : (isDone ? "lightgray" : "white")
                                }}
                            >
                                <TableCell>{ticket.ticketNo}</TableCell>
                                <TableCell>{ticket.filePath}</TableCell>
                                <TableCell>{ticket.status}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
};

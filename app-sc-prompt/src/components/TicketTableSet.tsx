/**
 * TicketTableSet component
 * @returns TicketTableSet component
 */

import { useState } from 'react';

import { TicketTable } from './TicketTable';
import { TicketInputHelper } from './TicketInputHelper';

import './TicketTableSet.css';


export type Ticket = {
    ticketNo: string;        // チケット番号
    filePath: string;        // チケットファイルパス
    status: "TODO" | "DONE"; // 状態管理
};

interface TicketTableSetProps {
    onSelectTicket: (ticketNo: string, ticketFilePath: string) => void;
    onChangedFinishedTicketNoList: (finishedTicketNoList: string[]) => void;
}

export const TicketTableSet = (ticketTableSetProps: TicketTableSetProps) => {
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const { onSelectTicket, onChangedFinishedTicketNoList } = ticketTableSetProps;
    const [tickets, setTickets] = useState<Ticket[]>([]);

    // チケット入力ヘルパーの表示をtoggleするハンドラー
    const handleOnClickInputHelper = () => {
        // チケット入力ヘルパーの表示をtoggleする
        const ticketInputHelper = document.getElementById('ticketInputHelper');
        if (ticketInputHelper) {
            ticketInputHelper.style.display = ticketInputHelper.style.display === 'block' ? 'none' : 'block';
        }
    }

    // チケットが選択されたときのハンドラー
    const handleOnSelectTicket = (ticket: Ticket) => {
        onSelectTicket(ticket.ticketNo, ticket.filePath);
        setSelectedTicket(ticket);
    }

    // ステータスを変更したときのハンドラー
    const handleOnChangeStatus = (status: "TODO" | "DONE") => {
        // 選択しているチケットのステータスを変更する
        if (selectedTicket) {
            const curTickets = tickets.map(ticket => ticket.ticketNo === selectedTicket.ticketNo ? { ...ticket, status } : ticket);
            setTickets(curTickets);
            setFinishedTicketNoList(curTickets);
        }
    }

    // チケット入力ヘルパーで、チケットが入力されたときのハンドラー
    const handleOnSetTicketsByHelper = (curTickets: Ticket[]) => {
        setTickets(curTickets);
        setFinishedTicketNoList(curTickets);
    }

    // 現在のticketsのうち、statusがDONEのチケット番号を取得する
    const setFinishedTicketNoList = (curTickets: Ticket[]) => {
        const finishedTicketNoList = curTickets.filter(ticket => ticket.status === "DONE").map(ticket => ticket.ticketNo);
        console.log(finishedTicketNoList);
        onChangedFinishedTicketNoList(finishedTicketNoList);
    }


    return (
        <div
            className="ticketTableSetDiv"
        >
            <div>
                <TicketTable
                    tickets={tickets}
                    onSelectTicket={handleOnSelectTicket}
                />
                <button onClick={handleOnClickInputHelper}>Input Helper</button>
                <div
                    id="ticketInputHelper"
                    style={{ display: 'none' }}
                >
                    <TicketInputHelper
                        onTicketsInput={handleOnSetTicketsByHelper}
                    />
                </div>
            </div>
            <div>
                status<br />
                {selectedTicket && (
                    <div
                        className="ticketTableSetStatusDiv"
                    >
                        <button
                            onClick={() => handleOnChangeStatus("TODO")}
                        >Todo</button>
                        <button
                            onClick={() => handleOnChangeStatus("DONE")}
                        >Done</button>
                    </div>
                )}
            </div>
        </div>
    );
}
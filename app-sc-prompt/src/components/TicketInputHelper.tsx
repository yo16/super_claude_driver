/**
 * TicketInputHelper component
 * `ls -la docs/tickets` の結果を取得して、Ticket[] に変換する
 */
import { useState } from 'react';

import type { Ticket } from './TicketTableSet';

import './TicketInputHelper.css';

interface TicketInputHelperProps {
    onTicketsInput: (tickets: Ticket[]) => void;
}

export function TicketInputHelper(ticketInputHelperProps: TicketInputHelperProps) {
    const { onTicketsInput } = ticketInputHelperProps;
    const [textareaValue, setTextareaValue] = useState('');
    const [textareaValue2, setTextareaValue2] = useState('');

    const handleOnClickInput = () => {
        // 入力値を取得する
        if (textareaValue.length > 0) {
            // 文字列から、チケット番号とファイルパスを生成する
            // 文字列の入力フォーマット
            // ```
            // total 148
            // -rwxrwxrwx 1 yo16 yo16 2991 Sep 16 17:56 README.md
            // -rwxrwxrwx 1 yo16 yo16 2600 Sep 16 19:22 T001_project_setup.md
            // -rwxrwxrwx 1 yo16 yo16 2157 Sep 16 13:02 T002_server_dependencies.md
            // -rwxrwxrwx 1 yo16 yo16 2173 Sep 16 13:02 T003_client_dependencies.md
            // -rwxrwxrwx 1 yo16 yo16 2360 Sep 16 13:02 T004_eslint_prettier.md
            // ```
            const SEP_POINT = 41;
            const tickets = textareaValue.split('\n').map((line) => {
                // 行の長さが41文字未満の場合は無視する
                if (line.length < SEP_POINT) {
                    return null;
                }

                // 固定で、41文字は無視して、42文字目以降(ファイル名)を利用する
                const filePath = line.slice(SEP_POINT);
                // ファイル名から、チケット番号を取得する(最初の"_"以前がチケット番号)
                const ticketNo = filePath.split('_')[0];
                return { ticketNo, filePath, status: "TODO" };
            });

            // nullを除外する
            const filteredTickets = tickets.filter(ticket => ticket !== null);

            //console.log(filteredTickets);
            onTicketsInput(filteredTickets as Ticket[]);
        }
    }
    const handleOnClickInput2 = () => {
        // 入力値を取得する
        if (textareaValue2.length > 0) {
            // 文字列から、チケット番号とファイルパスを生成する
            // 文字列の入力フォーマット
            // ```
            // ● T001,docs/tickets/T001_project_setup.md,DONE
            //   T002,docs/tickets/T002_server_dependencies.md,DONE
            //   T003,docs/tickets/T003_client_dependencies.md,TODO
            //   T004,docs/tickets/T004_eslint_prettier.md,TODO
            //   T101,docs/tickets/T101_express_server.md
            //   T401,docs/tickets/T401_react_app.md,DONE
            // ```
            // 先頭の"● "はない場合もある
            const tickets = textareaValue2.split('\n').map((line) => {
                // 先頭の"● "を削除する
                if (line.startsWith("● ")) {
                    line = line.slice(2);
                }
                // 先頭がスペースの場合はすべて削除する
                if (line.startsWith(" ")) {
                    line = line.trim();
                }
                // カンマでsplitして、チケット番号とファイルパスと進捗ステータスを取得する
                const [ticketNo, filePath, status] = line.split(',');
                // 空の場合はnullを返す
                if (!ticketNo || !filePath || !status) {
                    return null;
                }
                return { ticketNo, filePath, status: status || "TODO" };
            });
            // nullを除外する
            const filteredTickets = tickets.filter(ticket => ticket !== null);
            //console.log(filteredTickets);
            onTicketsInput(filteredTickets as Ticket[]);
        }
    }

    return (
        <>
            <div
                className="ticketInputHelperDiv"
            >
                <div>
                    <div>`ls -la docs/tickets` の結果</div>
                    <textarea
                        id="ticketInputHelperTextarea"
                        rows={5}
                        cols={20}
                        value={textareaValue}
                        onChange={(e) => setTextareaValue(e.target.value)}
                    ></textarea>
                    <button onClick={handleOnClickInput}>Input</button>
                </div>
                <div>
                    <div>チケット整列の結果</div>
                    <textarea
                        id="ticketInputHelperTextarea2"
                        rows={5}
                        cols={20}
                        value={textareaValue2}
                        onChange={(e) => setTextareaValue2(e.target.value)}
                    ></textarea>
                    <button onClick={handleOnClickInput2}>Input</button>
                    
                </div>

            </div>
        </>
    );
}
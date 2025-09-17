/**
 * TaskPrompts component
 * @returns TaskPrompts component
 */

import { useState } from 'react';

import { Section } from './Section';

import './TaskPrompts.css';

export default function TaskPrompts() {
    const [ticketNo, setTicketNo] = useState('T000');
    const [ticketFilePath, setTicketFilePath] = useState('docs/tickets/T000_initialize.md');
    const [finishedTicketNoList, setFinishedTicketNoList] = useState(['T001', 'T002', 'T003', 'T004', 'T101', 'T103', 'T201', 'T202', 'T401', 'T402']);

    const handleOnClickTicketNo = () => {
        // 入力値を選択する
        const input = document.querySelector('#ticketNo');
        if (input) {
            (input as HTMLInputElement).select();
        }
    }
    const handleOnClickTicketFilePath = () => {
        // 入力値を選択する
        const input = document.querySelector('#ticketFilePath');
        if (input) {
            (input as HTMLInputElement).select();
        }
    }
    const addFinishedTicketNo = (ticketNo: string) => {
        setFinishedTicketNoList([...finishedTicketNoList, ticketNo]);
    }

    return (
        <>
            <div>
                <div>
                    <div className="taskPromptsInputDiv">
                        <label>ticketNo: </label>
                        <input
                            id="ticketNo"
                            type="text"
                            value={ticketNo}
                            onChange={(e) => setTicketNo(e.target.value)}
                            onClick={handleOnClickTicketNo}
                        />
                    </div>
                    <div className="taskPromptsInputDiv">
                        <label>ticketFilePath: </label>
                        <input
                            id="ticketFilePath"
                            type="text"
                            value={ticketFilePath}
                            onChange={(e) => setTicketFilePath(e.target.value)}
                            onClick={handleOnClickTicketFilePath}
                        />
                    </div>
                </div>

                <Section
                    title="計画を立てる"
                    defaultPrompt="（あとでやる）"
                    ticketNo={ticketNo}
                    ticketFilePath={ticketFilePath}
                />

                <Section
                    title="タスクを確認する"
                    defaultPrompt={
                        "/sc:analyze " +
                        "\"`CLAUDE.md`、`docs/specifications/*.md` をもとにシステムを構築している。" +
                        "`docs/tickets`以下の[チケット](docs/tickets/TICKETS_LIST.md)のうち、" +
                        `${finishedTicketNoList}` +
                        "を完了している。" +
                        "次のチケットは[${ticketNo}](${ticketFilePath})である。" +
                        "必要なファイルを読み込み、チケットの概要と注意点を教えて。\""
                    }
                    ticketNo={ticketNo}
                    ticketFilePath={ticketFilePath}
                />

                <Section
                    title="タスクを実行する"
                    defaultPrompt={
                        "/sc:implement \"[${ticketNo}](${ticketFilePath})を実装して\""
                    }
                    ticketNo={ticketNo}
                    ticketFilePath={ticketFilePath}
                />

                <Section
                    title="タスクの実装をAIが終了したら確認"
                    defaultPrompt={
                        "/sc:analyze \"[${ticketNo}](${ticketFilePath})の実装が完了した。" +
                        "ドキュメントに記載されていることに抜け漏れや矛盾点がないことと、lintやbuild、テストに問題がないか確認して。\""
                    }
                    ticketNo={ticketNo}
                    ticketFilePath={ticketFilePath}
                />

                <Section
                    title="不具合があったら"
                    defaultPrompt={
                        "/sc:improve \"次の内容をfixしてください。1. 重要度:中の2件、重要度:低の`process.exit()`とフォーマット  2. T103以外のNodeJS型未定義エラー\""
                    }
                    ticketNo={ticketNo}
                    ticketFilePath={ticketFilePath}
                />

                <Section
                    title="終了時のドキュメント"
                    defaultPrompt={
                        "/sc:document \"${ticketNo}は終了とします。" +
                        "[${ticketNo}](${ticketFilePath})にステータスがあるので、DONEに更新して。" +
                        "ほかにも修正すべきドキュメント・修正すべき箇所を確認し、あったら修正して。" +
                        "暫定的に行ったことやあとで修正すべき残タスクがあったら、ドキュメントに追記した上で教えてください。\""
                    }
                    ticketNo={ticketNo}
                    ticketFilePath={ticketFilePath}
                />

                <Section
                    title="git"
                    defaultPrompt={
                        "/sc:git --smart-commit " +
                        "\"[${ticketNo}](${ticketFilePath})が終了した。" +
                        "プロジェクトルートディレクトリに移動して、すべての更新ファイルをadd, commit, pushして。\""
                    }
                    ticketNo={ticketNo}
                    ticketFilePath={ticketFilePath}
                />


            </div>
        </>
    );

}

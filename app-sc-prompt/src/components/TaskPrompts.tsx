/**
 * TaskPrompts component
 * @returns TaskPrompts component
 */

import { useState } from 'react';

import { TicketTableSet } from './TicketTableSet';
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

    // 終了チケットが変更された時のハンドラー
    const handleOnChangeFinishedTicketNoList = (finishedTicketNoList: string[]) => {
        setFinishedTicketNoList([...finishedTicketNoList]);
    }

    // TicketTableSetで、チケットが選択された時、ticketNoとticketFilePathを更新する
    const handleOnSelectTicket = (ticketNo: string, ticketFilePath: string) => {
        setTicketNo(ticketNo);
        setTicketFilePath(ticketFilePath);
    }

    return (
        <>
            <div>
                <div
                    className="taskPromptsHeaderContents"
                >
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
                    {/* チケットリスト */}
                    <div>
                        <TicketTableSet
                            onSelectTicket={handleOnSelectTicket}
                            onChangedFinishedTicketNoList={handleOnChangeFinishedTicketNoList}
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
                    title="チケット整列"
                    defaultPrompt={
                        "`docs/tickets`以下にチケットファイルがある。" +
                        "依頼事項: これらを、[チケットリスト](docs/tickets/TICKETS_LIST.md)の実装順序に従って、整列して。" +
                        "出力形式は、`チケット番号,チケットファイルパス`。\n" +
                        "例\n" +
                        "T001,docs/tickets/T001_initialize.md\n" +
                        "T002,docs/tickets/T002_initialize.md\n" +
                        "T003,docs/tickets/T003_initialize.md"
                    }
                    ticketNo={ticketNo}
                    ticketFilePath={ticketFilePath}
                />

                <Section
                    title="タスクを確認する"
                    defaultPrompt={
                        "/sc:analyze " +
                        "\"`CLAUDE.md`、`docs/specifications/*.md` をもとにシステムを構築している。\n" +
                        "`docs/tickets`以下の[チケット](docs/tickets/TICKETS_LIST.md)のうち、" +
                        `${finishedTicketNoList.join(', ')}` +
                        "を完了している。\n" +
                        "次のチケットは[${ticketNo}](${ticketFilePath})である。" +
                        "依頼事項: 必要なファイルを読み込み、チケットの概要と注意点を調査して。\""
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
                        "/sc:analyze \"[${ticketNo}](${ticketFilePath})の実装が完了した。\n" +
                        "依頼事項: ドキュメントに記載されていることに抜け漏れや矛盾点がないことと、lintやbuild、テストに問題がないか確認して。\""
                    }
                    ticketNo={ticketNo}
                    ticketFilePath={ticketFilePath}
                />

                <Section
                    title="不具合があったら（下記プロンプトは例）"
                    defaultPrompt={
                        "/sc:improve \"次の内容をfixしてください。" +
                        "1. 重要度:中の2件、重要度:低の`process.exit()`とフォーマット\n" +
                        "2. T103以外のNodeJS型未定義エラー\""
                    }
                    ticketNo={ticketNo}
                    ticketFilePath={ticketFilePath}
                />

                <Section
                    title="終了時のドキュメント"
                    defaultPrompt={
                        "/sc:document \"${ticketNo}は終了とします。" +
                        "下記を順に実行し、それぞれ報告してください。\n" +
                        "1. ステータス更新: [${ticketNo}](${ticketFilePath})にステータスがあるので、DONEに更新して。\n" +
                        "2. ドキュメント修正: ほかにも修正すべきドキュメント・修正すべき箇所を確認し、あったら修正して。\n" +
                        "3. ドキュメント追記: 暫定的に対応したソースやあとで修正すべき残タスクがあったら、ドキュメントに追記してください。\""
                    }
                    ticketNo={ticketNo}
                    ticketFilePath={ticketFilePath}
                />

                <Section
                    title="git"
                    defaultPrompt={
                        "/sc:git --smart-commit " +
                        "\"[${ticketNo}](${ticketFilePath})が完全に終了しました。" +
                        "プロジェクトルートディレクトリに移動して、すべての更新ファイルをadd, commit, pushして。\""
                    }
                    ticketNo={ticketNo}
                    ticketFilePath={ticketFilePath}
                />


            </div>
        </>
    );

}

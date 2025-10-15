/**
 * TaskPrompts component
 * @returns TaskPrompts component
 */

import { useState, useEffect } from 'react';

import { TicketTableSet } from './TicketTableSet';
import { Section } from './Section';

import './TaskPrompts.css';

interface PromptConfig {
    title: string;
    defaultPrompt: string;
}

export default function TaskPrompts() {
    const [ticketNo, setTicketNo] = useState('T000');
    const [ticketFilePath, setTicketFilePath] = useState('docs/tickets/T000_initialize.md');
    const [finishedTicketNoList, setFinishedTicketNoList] = useState<string[]>([]);
    const [defaultPrompts, setDefaultPrompts] = useState<PromptConfig[]>([]);

    // JSONファイルからプロンプト設定を読み込む
    useEffect(() => {
        const loadPrompts = async () => {
            try {
                const response = await fetch('/config/default-prompts.json');
                const prompts: PromptConfig[] = await response.json();
                setDefaultPrompts(prompts);
            } catch (error) {
                console.error('プロンプト設定の読み込みに失敗しました:', error);
                // フォールバック用のデフォルト値
                setDefaultPrompts([
                    {
                        title: '計画を立てる',
                        defaultPrompt: '（あとでやる）'
                    }
                ]);
            }
        };
        loadPrompts();
    }, []);

    // プロンプト内の変数を置換する関数
    const replacePromptVariables = (prompt: string): string => {
        return prompt
            .replace(/{finishedTicketNoList}/g, finishedTicketNoList.join(', '))
            .replace(/{ticketNo}/g, ticketNo)
            .replace(/{ticketFilePath}/g, ticketFilePath);
    };

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

                {defaultPrompts.map((prompt, index) => (
                    <Section
                        key={index}
                        title={prompt.title}
                        defaultPrompt={replacePromptVariables(prompt.defaultPrompt)}
                        ticketNo={ticketNo}
                        ticketFilePath={ticketFilePath}
                    />
                ))}

            </div>
        </>
    );

}

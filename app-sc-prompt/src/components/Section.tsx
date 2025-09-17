/**
 * Section component
 * @param props - SectionProps
 * @returns Section component
 */

import { useState, useEffect, useId } from 'react';

import './Section.css';

interface SectionProps {
    title: string;
    defaultPrompt: string;
    ticketNo: string;
    ticketFilePath: string;
}

export function Section(props: SectionProps) {
    const { title, defaultPrompt, ticketNo, ticketFilePath } = props;
    const [currentPrompt, setCurrentPrompt] = useState(defaultPrompt);
    const curSectionId = useId();
    const textAreaId = `currentPrompt-${curSectionId}`;

    // defaultPromptの中の${ticketNo}をticketNoに、${ticketFilePath}をticketFilePathに置き換える
    const createReplacedDefaultPrompt = () => {
        return defaultPrompt
            .replaceAll('${ticketNo}', ticketNo)
            .replaceAll('${ticketFilePath}', ticketFilePath);
    }
    useEffect(() => {
        setCurrentPrompt(
            createReplacedDefaultPrompt()
        );
    }, [ticketNo, ticketFilePath]);

    const handleOnClickPrompt = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        // 入力値を選択する
        const input = e.target;
        if (input) {
            (input as HTMLTextAreaElement).select();
        }
    }
    const handleOnChangePrompt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentPrompt(e.target.value);
    }

    const handleOnClickReset = () => {
        // 初期化する
        setCurrentPrompt(
            createReplacedDefaultPrompt()
        );
    }

    return (
        <>
            <div
                className="sectionDiv"
            >
                <h2>{title}</h2>
                <div
                    className="sectionTextareaDivContent"
                >
                    <textarea
                        id={textAreaId}
                        rows={10}
                        cols={80}
                        defaultValue={currentPrompt}
                        value={currentPrompt}
                        onClick={handleOnClickPrompt}
                        onChange={handleOnChangePrompt}
                    ></textarea>
                    <button onClick={handleOnClickReset}>Reset</button>
                </div>
            </div>
        </>
    );
}

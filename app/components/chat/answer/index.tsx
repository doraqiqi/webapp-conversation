'use client'
import type { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import LoadingAnim from '../loading-anim'
import s from '../style.module.css'
import ImageGallery from '../../base/image-gallery'
import Thought from '../thought'
import { randomString } from '@/utils/string'
import type { ChatItem, VisionFile } from '@/types/app'
import WorkflowProcess from '@/app/components/workflow/workflow-process'
import { Markdown } from '@/app/components/base/markdown'
import type { Emoji } from '@/types/tools'

const IconWrapper: FC<{ children: React.ReactNode | string }> = ({ children }) => {
  return <div className={'rounded-lg h-6 w-6 flex items-center justify-center hover:bg-gray-100'}>
    {children}
  </div>
}

type IAnswerProps = {
  item: ChatItem
  feedbackDisabled: boolean
  isResponding?: boolean
  allToolIcons?: Record<string, string | Emoji>
}

// The component needs to maintain its own state to control whether to display input component
const Answer: FC<IAnswerProps> = ({
  item,
  feedbackDisabled = false,
  isResponding,
  allToolIcons,
}) => {
  const { id, content, agent_thoughts, workflowProcess } = item;
  const isAgentMode = !!agent_thoughts && agent_thoughts.length > 0;
  const { t } = useTranslation();

  const getImgs = (list?: VisionFile[]) => {
    if (!list) return [];
    return list.filter(
      (file) => file.type === 'image' && file.belongs_to === 'assistant'
    );
  };

  const agentModeAnswer = (
    <div>
      {agent_thoughts?.map((item, index) => (
        <div key={index}>
          {item.thought && <Markdown content={item.thought} />}
          {!!item.tool && (
            <Thought
              thought={item}
              allToolIcons={allToolIcons || {}}
              isFinished={!!item.observation || !isResponding}
            />
          )}
          {getImgs(item.message_files).length > 0 && (
            <ImageGallery
              srcs={getImgs(item.message_files).map((item) => item.url)}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-full overflow-x-hidden" style={{ maxWidth: '100%', minWidth: 'auto' }}>
      <div className="flex items-start">
        <div className={`${s.answerIcon} w-10 h-10 shrink-0`}>
          {isResponding && (
            <div className={s.typeingIcon}>
              <LoadingAnim type="avatar" />
            </div>
          )}
        </div>
        <div className={`${s.answerWrap}`}>
          <div className={`${s.answer} relative text-sm text-gray-900`}>
            <div
              className={`ml-2 py-3 px-4 bg-gray-100 rounded-tr-2xl rounded-b-2xl ${workflowProcess && 'max-w-full'
                }`}
              style={{ maxWidth: '100%', minWidth: 'auto' }}
            >
              {workflowProcess && (
                <WorkflowProcess data={workflowProcess} hideInfo />
              )}
              {isResponding && (isAgentMode
                ? (!content &&
                  (agent_thoughts || []).filter(
                    (item) => !!item.thought || !!item.tool
                  ).length === 0)
                : !content) ? (
                <div className="flex items-center justify-center w-6 h-5">
                  <LoadingAnim type="text" />
                </div>
              ) : isAgentMode ? (
                agentModeAnswer
              ) : (
                <Markdown content={content} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default React.memo(Answer);

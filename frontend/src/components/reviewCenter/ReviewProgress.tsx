// Copyright 2026 Open Dreamina Contributors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { SkipForward } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'

/**
 * 审阅进度条（R-5）：已审 / 共计 + 进度条 +「下一条待审」跳转。
 * 供素材审阅与镜头审片两个面板共用，放在 SessionToolbar 的 children 行内
 * （父容器 flex-wrap，本组件占满一行）。
 */
export function ReviewProgress({
  reviewed,
  total,
  onNextPending,
}: {
  reviewed: number
  total: number
  onNextPending: () => void
}) {
  const pending = Math.max(0, total - reviewed)
  const percent = total > 0 ? Math.round((reviewed / total) * 100) : 0
  const allDone = total > 0 && pending === 0
  return (
    <div className="flex w-full items-center gap-3">
      <Progress
        value={percent}
        aria-label="审阅进度"
        className="min-w-0 flex-1"
      />
      <span className="shrink-0 text-fg-muted">
        已审 {reviewed} / 共 {total} 个
        {allDone && <span className="ml-2 font-medium text-success">已全部审完</span>}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={onNextPending}
        disabled={pending === 0}
        aria-label={allDone ? '已全部审完，没有待审条目' : '跳到下一条待审'}
        title={allDone ? '已全部审完' : '跳到下一条待审'}
      >
        <SkipForward className="h-3.5 w-3.5" />
        下一条待审
      </Button>
    </div>
  )
}

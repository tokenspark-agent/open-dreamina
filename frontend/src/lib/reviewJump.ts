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

/** 审阅条目卡片的 DOM id 前缀：面板据此定位「下一条待审」。 */
export const REVIEW_ITEM_DOM_ID_PREFIX = 'review-item-'

export function reviewItemDomId(itemId: string): string {
  return `${REVIEW_ITEM_DOM_ID_PREFIX}${itemId}`
}

/**
 * 把指定审阅条目滚动到视口中央并聚焦，便于读屏用户感知跳转目标。
 * 找不到元素时返回 false（调用方保留跳转目标，等渲染出该条目后再试）。
 * 减弱动态偏好下用 instant 滚动，遵守全局 prefers-reduced-motion 口径。
 */
export function scrollToReviewItem(itemId: string): boolean {
  const el = document.getElementById(reviewItemDomId(itemId))
  if (!el) return false
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' })
  el.focus({ preventScroll: true })
  return true
}

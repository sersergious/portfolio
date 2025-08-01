// =======================================
// components/notion/NotionBlock.tsx
// =======================================
"use client"

import { useState } from 'react'
import { ChevronRight, ChevronDown, AlertCircle, Lightbulb, Info, AlertTriangle } from 'lucide-react'
import { notionUtils, type NotionBlock as NotionBlockType } from '@/lib/notion'

interface NotionBlockProps {
  block: NotionBlockType
  level?: number
}

export function NotionBlock({ block, level = 0 }: NotionBlockProps) {
  const [isToggleOpen, setIsToggleOpen] = useState(false)

  const renderBlock = () => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p className="text-foreground leading-7 mb-4">
            {block.content}
          </p>
        )

      case 'heading_1':
        return (
          <h1 className="text-3xl font-bold text-foreground mt-8 mb-4 leading-tight">
            {block.content}
          </h1>
        )

      case 'heading_2':
        return (
          <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3 leading-tight">
            {block.content}
          </h2>
        )

      case 'heading_3':
        return (
          <h3 className="text-xl font-semibold text-foreground mt-5 mb-2 leading-tight">
            {block.content}
          </h3>
        )

      case 'bulleted_list_item':
        return (
          <div className={`flex gap-3 mb-2 ${level > 0 ? 'ml-6' : ''}`}>
            <span className="text-muted-foreground mt-2 text-sm">•</span>
            <p className="text-foreground leading-7 flex-1">{block.content}</p>
          </div>
        )

      case 'numbered_list_item':
        return (
          <div className={`flex gap-3 mb-2 ${level > 0 ? 'ml-6' : ''}`}>
            <span className="text-muted-foreground mt-2 text-sm">1.</span>
            <p className="text-foreground leading-7 flex-1">{block.content}</p>
          </div>
        )

      case 'quote':
        return (
          <blockquote className="border-l-4 border-primary pl-4 py-2 mb-4 bg-muted/50 rounded-r-lg">
            <p className="text-foreground italic leading-7">{block.content}</p>
          </blockquote>
        )

      case 'code':
        return (
          <div className="mb-4">
            <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto">
              <code className={`text-sm text-foreground ${block.properties?.language || ''}`}>
                {block.content}
              </code>
            </pre>
          </div>
        )

      case 'divider':
        return <hr className="border-border my-8" />

      case 'image':
        return (
          <div className="mb-6">
            <img
              src={block.properties?.url || ''}
              alt={block.properties?.caption || ''}
              className="w-full rounded-lg border border-border"
            />
            {block.properties?.caption && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                {block.properties.caption}
              </p>
            )}
          </div>
        )

      case 'callout':
        const calloutClasses = notionUtils.getCalloutClasses(block.properties?.color)
        const CalloutIcon = getCalloutIcon(block.properties?.icon)

        return (
          <div className={`border rounded-lg p-4 mb-4 ${calloutClasses}`}>
            <div className="flex gap-3">
              {CalloutIcon && <CalloutIcon className="w-5 h-5 shrink-0 mt-0.5" />}
              <div className="flex-1">
                <p className="leading-7">{block.content}</p>
              </div>
            </div>
          </div>
        )

      case 'toggle':
        return (
          <div className="mb-4">
            <button
              onClick={() => setIsToggleOpen(!isToggleOpen)}
              className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-muted/50 transition-colors"
            >
              {isToggleOpen ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
              <span className="text-foreground font-medium">{block.content}</span>
            </button>
            {isToggleOpen && block.children && (
              <div className="ml-6 mt-2">
                {block.children.map((child) => (
                  <NotionBlock key={child.id} block={child} level={level + 1} />
                ))}
              </div>
            )}
          </div>
        )

      case 'to_do':
        return (
          <div className="flex items-start gap-3 mb-2">
            <input
              type="checkbox"
              checked={block.properties?.checked || false}
              readOnly
              className="mt-2 rounded border-border"
            />
            <p className={`leading-7 flex-1 ${
              block.properties?.checked
                ? 'text-muted-foreground line-through'
                : 'text-foreground'
            }`}>
              {block.content}
            </p>
          </div>
        )

      default:
        return (
          <p className="text-foreground leading-7 mb-4">
            {block.content}
          </p>
        )
    }
  }

  return (
    <div className="notion-block">
      {renderBlock()}
      {block.children && block.type !== 'toggle' && (
        <div className={level > 0 ? 'ml-4' : ''}>
          {block.children.map((child) => (
            <NotionBlock key={child.id} block={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

// Helper function for callout icons
function getCalloutIcon(iconType?: string) {
  const iconMap = {
    'info': Info,
    'warning': AlertTriangle,
    'error': AlertCircle,
    'lightbulb': Lightbulb,
  }
  return iconMap[iconType as keyof typeof iconMap] || Info
}
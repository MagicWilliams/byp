'use client';

import { useState, useMemo } from 'react';
import Issue from './Issue';
import { BLEIssue } from '../lib/wordpress';

interface IssuesGridProps {
  issues: BLEIssue[];
}

export default function IssuesGrid({ issues }: IssuesGridProps) {
  // Only latest (first) issue expanded by default; others collapsed
  const initialCollapsed = useMemo(() => {
    const state: Record<number, boolean> = {};
    issues.forEach((issue, idx) => {
      state[issue.id] = idx !== 0; // index 0 = expanded, rest = collapsed
    });
    return state;
  }, [issues]);

  const [collapsedIssues, setCollapsedIssues] = useState(initialCollapsed);

  const toggleCollapse = (issueId: number) => {
    setCollapsedIssues(prev => ({
      ...prev,
      [issueId]: !prev[issueId],
    }));
  };

  return (
    <div className="space-y-0" id="issues">
      {issues.map((issue, idx) => (
        <Issue
          key={issue.id}
          issue={issue}
          index={idx}
          isLatest={idx === 0}
          collapsed={collapsedIssues[issue.id] ?? idx !== 0}
          onToggle={() => toggleCollapse(issue.id)}
        />
      ))}
    </div>
  );
}

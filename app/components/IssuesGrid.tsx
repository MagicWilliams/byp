'use client';

import { useState } from 'react';
import Issue from './Issue';
import { BLEIssue } from '../lib/wordpress';

interface IssuesGridProps {
  issues: BLEIssue[];
}

export default function IssuesGrid({ issues }: IssuesGridProps) {
  const [collapsedIssues, setCollapsedIssues] = useState<{
    [id: number]: boolean;
  }>({});

  const toggleCollapse = (issueId: number) => {
    setCollapsedIssues(prev => ({
      ...prev,
      [issueId]: !prev[issueId],
    }));
  };

  return (
    <div className="space-y-12">
      {issues.map((issue, idx) => (
        <Issue
          key={issue.id}
          issue={issue}
          index={idx}
          collapsed={!!collapsedIssues[issue.id]}
          onToggle={() => toggleCollapse(issue.id)}
        />
      ))}
    </div>
  );
}

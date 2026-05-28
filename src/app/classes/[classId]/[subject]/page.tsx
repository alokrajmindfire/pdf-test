'use client';

import { useParams } from 'next/navigation';
import { SubjectPage } from '../../../../ui-pages/SubjectPage';

export default function Page() {
  const params = useParams<{ classId: string; subject: string }>();
  return <SubjectPage __nextParams={params ?? {}} />;
}


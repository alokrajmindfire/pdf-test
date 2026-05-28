'use client';

import { useParams } from 'next/navigation';
import { ReadPage } from '../../../ui-pages/ReadPage';

export default function Page() {
  const params = useParams<{ materialId: string }>();
  return <ReadPage __nextParams={params ?? {}} />;
}


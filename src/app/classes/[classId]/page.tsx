'use client';

import { useParams } from 'next/navigation';
import { ClassDetailPage } from '../../../ui-pages/ClassDetailPage';

export default function Page() {
  // Bridge: old page expects react-router useParams; we pass via global (patched below).
  const params = useParams<{ classId: string }>();
  return <ClassDetailPage __nextParams={params ?? {}} />;
}


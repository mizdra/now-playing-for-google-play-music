import React from 'react';

export type Props = {
  children: React.ReactNode;
};

export function Container(props: Props) {
  return (
    <div className="container" style={{ maxWidth: '80rem' }}>
      {props.children}
    </div>
  );
}

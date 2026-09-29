'use client';

import * as React from 'react';

export function getStrictContext<T>(
  name: string,
): readonly [
  (props: { value: T; children: React.ReactNode }) => React.JSX.Element,
  () => T,
] {
  const Context = React.createContext<T | undefined>(undefined);

  function Provider(props: { value: T; children: React.ReactNode }) {
    return <Context.Provider value={props.value}>{props.children}</Context.Provider>;
  }

  function useStrictContext() {
    const value = React.useContext(Context);
    if (value === undefined) {
      throw new Error(`${name} must be used within ${name}Provider`);
    }
    return value;
  }

  return [Provider, useStrictContext] as const;
}

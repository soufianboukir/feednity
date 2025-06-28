"use client"

import { Switch } from '@headlessui/react'

type SwitchToggleProps = {
    isEnabled: boolean;
    setIsEnabled: (isEnabled: boolean) => void
}

export function SwitchToggle({ isEnabled, setIsEnabled }: SwitchToggleProps) {
  
    return (
      <Switch
        checked={isEnabled}
        onChange={setIsEnabled}
        className={`${
            isEnabled ? 'bg-blue-500' : 'bg-gray-400'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span
          className={`${
            isEnabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
    )
  }
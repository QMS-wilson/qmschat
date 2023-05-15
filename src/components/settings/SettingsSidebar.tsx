import { For } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { platformSettingsUIList } from '@/stores/provider'
import { providerSettingsMap, setSettingsByProviderId, updateGeneralSettings } from '@/stores/settings'
import ThemeToggle from '../ui/ThemeToggle'
import ProviderGlobalSettings from './ProviderGlobalSettings'
import AppGeneralSettings from './AppGeneralSettings'
import type { GeneralSettings } from '@/types/app'

export default () => {
  const $providerSettingsMap = useStore(providerSettingsMap)
  const generalSettings = () => {
    return ($providerSettingsMap().general || {}) as unknown as GeneralSettings
  }

  return (
    <div class="h-full flex flex-col bg-sidebar">
      <header class="h-14 fi border-b border-base px-4 text-xs uppercase">
        Settings
      </header>
      <main class="flex-1 overflow-auto">
        <AppGeneralSettings
          settingsValue={() => generalSettings()}
          updateSettings={updateGeneralSettings}
        />
        <For each={platformSettingsUIList}>
          {item => (
            <ProviderGlobalSettings
              config={item}
              settingsValue={() => $providerSettingsMap()[item.id]}
              setSettings={v => setSettingsByProviderId(item.id, v)}
            />
          )}
        </For>
      </main>
      <footer class="h-14 fi justify-between px-3">
        <ThemeToggle />
        <div text-xs op-40 px-2>
          {/* <p mt-8 text-xs op-30> */}
          <span pr-1>Made by</span>
          <a
            b-slate-link
            href="https://qingmengshe.oss-cn-beijing.aliyuncs.com/chat/qms.jpg"
            target="_blank"
            rel="noreferrer"
          >
            Qms
          </a>
          <span px-1>|</span>
          <a
            b-slate-link
            href="https://qingmengshe.oss-cn-beijing.aliyuncs.com/chat/author.jpg"
            target="_blank"
            rel="noreferrer"
          >
            Contact author
          </a>
          {/* </p> */}
          {/* <a href="https://docs.anse.app" target="_blank" rel="noreferrer" class="hv-foreground">
            Docs
          </a>
          <span class="px-1"> · </span>
          <a href="https://github.com/anse-app/anse" target="_blank" rel="noreferrer" class="hv-foreground">
            Github
          </a> */}
        </div>
      </footer>
    </div>
  )
}

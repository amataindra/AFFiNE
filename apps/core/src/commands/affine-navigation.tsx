import type { useAFFiNEI18N } from '@affine/i18n/hooks';
import { ArrowRightBigIcon } from '@blocksuite/icons';
import type { Workspace } from '@blocksuite/store';
import { registerAffineCommand } from '@toeverything/infra/command';
import type { createStore } from 'jotai';

import {
  openSettingModalAtom,
  openWorkspaceListModalAtom,
  type PageModeOption,
} from '../atoms';
import type { useNavigateHelper } from '../hooks/use-navigate-helper';
import { WorkspaceSubPath } from '../shared';

export function registerAffineNavigationCommands({
  t,
  store,
  workspace,
  navigationHelper,
  pageMode,
  setPageMode,
}: {
  t: ReturnType<typeof useAFFiNEI18N>;
  store: ReturnType<typeof createStore>;
  navigationHelper: ReturnType<typeof useNavigateHelper>;
  pageMode: PageModeOption;
  setPageMode: React.Dispatch<React.SetStateAction<PageModeOption>>;
  workspace: Workspace;
}) {
  const unsubs: Array<() => void> = [];
  unsubs.push(
    registerAffineCommand({
      id: 'affine:goto-all-pages',
      category: 'affine:navigation',
      icon: <ArrowRightBigIcon />,
      label: () => t['com.affine.cmdk.affine.navigation.goto-all-pages'](),
      run() {
        navigationHelper.jumpToSubPath(workspace.id, WorkspaceSubPath.ALL);
        setPageMode('all');
      },
    })
  );

  unsubs.push(
    registerAffineCommand({
      id: 'affine:goto-page-list',
      category: 'affine:navigation',
      icon: <ArrowRightBigIcon />,
      preconditionStrategy: () => {
        return pageMode !== 'page';
      },
      label: () => t['com.affine.cmdk.affine.navigation.goto-page-list'](),
      run() {
        navigationHelper.jumpToSubPath(workspace.id, WorkspaceSubPath.ALL);
        setPageMode('page');
      },
    })
  );

  unsubs.push(
    registerAffineCommand({
      id: 'affine:goto-edgeless-list',
      category: 'affine:navigation',
      icon: <ArrowRightBigIcon />,
      preconditionStrategy: () => {
        return pageMode !== 'edgeless';
      },
      label: () => t['com.affine.cmdk.affine.navigation.goto-edgeless-list'](),
      run() {
        navigationHelper.jumpToSubPath(workspace.id, WorkspaceSubPath.ALL);
        setPageMode('edgeless');
      },
    })
  );

  unsubs.push(
    registerAffineCommand({
      id: 'affine:goto-workspace',
      category: 'affine:navigation',
      icon: <ArrowRightBigIcon />,
      label: () => t['com.affine.cmdk.affine.navigation.goto-workspace'](),
      run() {
        store.set(openWorkspaceListModalAtom, true);
      },
    })
  );

  unsubs.push(
    registerAffineCommand({
      id: 'affine:open-settings',
      category: 'affine:navigation',
      icon: <ArrowRightBigIcon />,
      label: () => t['com.affine.cmdk.affine.navigation.open-settings'](),
      run() {
        store.set(openSettingModalAtom, {
          activeTab: 'appearance',
          workspaceId: null,
          open: true,
        });
      },
    })
  );

  unsubs.push(
    registerAffineCommand({
      id: 'affine:goto-trash',
      category: 'affine:navigation',
      icon: <ArrowRightBigIcon />,
      label: () => t['com.affine.cmdk.affine.navigation.goto-trash'](),
      run() {
        navigationHelper.jumpToSubPath(workspace.id, WorkspaceSubPath.TRASH);
        setPageMode('all');
      },
    })
  );

  return () => {
    unsubs.forEach(unsub => unsub());
  };
}

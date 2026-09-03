import assert from 'node:assert/strict';
import test from 'node:test';

import { findOgImageBrand } from '../src/og-images/catalog.ts';
import { readPageFrontmatter } from '../src/og-images/frontmatter.ts';
import { signOgImageUrl } from '../src/og-images/signing.ts';

test('reads plain and quoted page metadata', () => {
  assert.deepEqual(
    readPageFrontmatter(`---
title: Manage example records
description: "Choose where an example should point"
ogTitle: Build sample workflows
---
`),
    {
      title: 'Manage example records',
      description: 'Choose where an example should point',
      ogTitle: 'Build sample workflows',
    },
  );
});

test('selects product branding and API labels from the route', () => {
  assert.equal(findOgImageBrand('/developers/accountchief').styleId, 'accountchief');
  assert.equal(findOgImageBrand('/domainchief/example').styleId, 'domainchief');
  assert.equal(findOgImageBrand('/domainchief/example').label, 'Documentation');
  assert.equal(findOgImageBrand('/developers/domainchief').styleId, 'domainchief');
  assert.equal(findOgImageBrand('/developers/certchief').styleId, 'certchief');
  assert.equal(findOgImageBrand('/developers/deploychief').styleId, 'deploychief');
  assert.equal(findOgImageBrand('/developers/tny').styleId, 'tny');
  assert.equal(findOgImageBrand('/developers/flowguard').styleId, 'flowguard');
  assert.equal(findOgImageBrand('/api/accountchief/example').styleId, 'accountchief');
  assert.equal(findOgImageBrand('/api/accountchief/example').label, 'API reference');
  assert.equal(findOgImageBrand('/api/domainchief/example').label, 'API reference');
  assert.equal(findOgImageBrand('/api/flowguard/example').label, 'API reference');
});

test('creates a stable signed image URL', () => {
  assert.equal(
    signOgImageUrl({
      secret: 'synthetic-test-key',
      signerId: 'exampledocs',
      styleId: 'exampleapp',
      slug: 'manage-example-records',
      params: {
        title: 'Manage example records',
        description: 'Choose where a synthetic example should point.',
        label: 'Documentation',
      },
    }),
    'https://static.assets.chief.tools/og/exampledocs:exampleapp/eyJ0aXRsZSI6Ik1hbmFnZSBleGFtcGxlIHJlY29yZHMiLCJkZXNjcmlwdGlvbiI6IkNob29zZSB3aGVyZSBhIHN5bnRoZXRpYyBleGFtcGxlIHNob3VsZCBwb2ludC4iLCJsYWJlbCI6IkRvY3VtZW50YXRpb24ifQ/manage-example-records.png?signature=9K6mMuZ-tSzVEM0ctTnSsK3BM9OkTfqg7ujdRhNkCfw&v=3',
  );
});

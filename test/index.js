import test from 'ava';
import path from 'path';
import { lookup, lookupSync } from '../src';

test.cb('Retuns fullpath of package.json from ./test', t => {
  const file = 'package.json';

  /** @test {lookupSync} */
  const filePath = lookupSync(file, { cwd: __dirname });
  t.ok(filePath === path.join(__dirname, '..', 'package.json'));

  /** @test {lookup} */
  lookup(file, { cwd: __dirname }, (error, lookedupPath) => {
    t.ok(error === null);
    t.ok(lookedupPath === path.join(__dirname, '..', 'package.json'));
    t.end();
  });
});

test.cb('Can\'t be found from root path it will be the exception.', t => {
  const file = '要反省である.txt';

  /** @test {lookupSync} */
  t.throws(() => {
    lookupSync(file);
  });

  /** @test {lookup} */
  lookup(file, (error, lookedupPath) => {
    t.ok(error);
    t.ok(lookedupPath === undefined);
    t.end();
  });
});

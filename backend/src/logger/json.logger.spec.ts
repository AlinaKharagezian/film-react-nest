import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  it('должен форматировать сообщение в формате JSON', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    logger.log('Тест JSON');

    const output = consoleSpy.mock.calls[0][0];
    const parsed = JSON.parse(output);

    expect(consoleSpy).toHaveBeenCalled();
    expect(parsed.level).toBe('log');
    expect(parsed.message).toBe('Тест JSON');

    consoleSpy.mockRestore();
  });
});

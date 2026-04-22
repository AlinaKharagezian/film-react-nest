import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  it('должен форматировать сообщение в формате TSKV', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    logger.log('Тестовое сообщение');

    const output = consoleSpy.mock.calls[0][0];
    expect(consoleSpy).toHaveBeenCalled();
    expect(output).toContain('tskv\t');
    expect(output).toContain('level=log\t');
    expect(output).toContain('message=Тестовое сообщение');

    consoleSpy.mockRestore();
  });
});

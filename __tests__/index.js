const statsWrapper = require('../src/index');

describe('stats wrapper', () => {
    it('returns a wrapper function', () => {
        const wrapper = statsWrapper(() => {});

        expect(typeof wrapper).toBe('function');
    });

    it('get the stats', () => {
        const fn = Math.random;

        const wrapper = statsWrapper(fn);

        wrapper();
        wrapper();
        wrapper();

        const stats = wrapper.getExecStats();

        expect(stats.executedTimes).toBe(3);

        expect(stats.minTime).toBeGreaterThanOrEqual(0);
        expect(stats.maxTime).toBeGreaterThanOrEqual(stats.minTime);

        expect(stats.meanTime).toBeGreaterThanOrEqual(stats.minTime);
        expect(stats.meanTime).toBeLessThanOrEqual(stats.maxTime);

        expect(stats.totalTime).toBeGreaterThanOrEqual(stats.maxTime);
    });

    it('get the stats when enabled by default', () => {
        const fn = Math.random;

        const wrapper = statsWrapper(fn);

        wrapper();
        wrapper();
        wrapper();

        const stats = wrapper.getExecStats();

        expect(stats.executedTimes).toBe(3);

        expect(stats.minTime).toBeGreaterThanOrEqual(0);
        expect(stats.maxTime).toBeGreaterThanOrEqual(stats.minTime);

        expect(stats.meanTime).toBeGreaterThanOrEqual(stats.minTime);
        expect(stats.meanTime).toBeLessThanOrEqual(stats.maxTime);

        expect(stats.totalTime).toBeGreaterThanOrEqual(stats.maxTime);
    });

    it('get empty stats when disabled', () => {
        const fn = Math.random;

        const wrapper = statsWrapper(fn, {
            disabled: true,
        });

        wrapper();
        wrapper();
        wrapper();

        const stats = wrapper.getExecStats();

        expect(stats.executedTimes).toBe(0);
    });

    it('get stats when enabled after creating disabled wrapper by default', () => {
        const fn = Math.random;

        const wrapper = statsWrapper(fn, {
            disabled: true,
        });

        wrapper();

        let stats = wrapper.getExecStats();
        expect(stats.executedTimes).toBe(0);

        wrapper.enableExecStats();
        wrapper();

        stats = wrapper.getExecStats();
        expect(stats.executedTimes).toBe(1);

        wrapper.disableExecStats();
        wrapper();

        stats = wrapper.getExecStats();
        expect(stats.executedTimes).toBe(1);
    });
});

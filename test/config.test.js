import { hocon } from '../dist/';
import { expect } from 'chai';

describe('test config', function() {
    it('should parse config', async () => {
        const Hocon = await hocon();
        const cfg = new Hocon.Config("region : 2\n\nregions {\n    1 : us-east-1\n    2 : eu-west-1\n    3 : sa-east-1\n}");
        expect(cfg.toHOCON()).to.equals('region=2,regions{"3"=sa-east-1,"2"=eu-west-1,"1"=us-east-1}');
        expect(cfg.toJSON()).to.equals('{"region":2,"regions":{"3":"sa-east-1","2":"eu-west-1","1":"us-east-1"}}');
        cfg.delete();
    });
});
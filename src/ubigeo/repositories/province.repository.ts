import { EntityRepository, Repository } from "typeorm";
import { Province } from "../entities/provice.entity";

@EntityRepository(Province)
export class ProvinceRepository extends Repository<Province> {

}

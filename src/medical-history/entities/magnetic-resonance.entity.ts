import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MagneticResonanceStatus } from './enums';
import { MedicalHistory } from './medical-history.entity';



@Entity('magnetic_resonances')
export class MagneticResonance extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'resonance_area_name',
    type: 'varchar',
    length: 200,
    nullable: true,
    default: '',
  })
  resonanceAreaName: string;

  @Column({
    name: 'resonance_image_link',
    type: 'varchar',
    length: 500,
    nullable: true,
    default: '',
  })
  resonanceImageLink: string;

  @Column({
    name: 'filename',
    type: 'varchar',
    length: 100,
    nullable: true,
    default: '',
  })
  filename: string;

  @ManyToOne(() => MedicalHistory, (medicalHistory: MedicalHistory) => medicalHistory.magneticResonances, { primary: false } )
   medicalHistory: MedicalHistory;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({
    type: 'enum',
    name: 'status',
    enum: MagneticResonanceStatus,
    default: MagneticResonanceStatus.ACTIVE,
  })
  status: MagneticResonanceStatus;
}

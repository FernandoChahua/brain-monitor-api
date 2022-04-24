import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AssignmentRequestStatus, AssignmentStatus, PriorizationType } from "./enums";
import {MedicalHistory} from "./medical-history.entity";




@Entity('assignment_requests')
export class AssignmentRequest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    name: 'priorization_type',
    enum: PriorizationType,
    default: PriorizationType.NOT_ASSIGNED,
  })
  priorizationType: PriorizationType;

  @Column({
    type: 'enum',
    name: 'assignment_status',
    enum: AssignmentStatus,
    default: AssignmentStatus.NOT_ASSIGNED,
  })
  assignmentStatus: AssignmentStatus;

  @ManyToOne(() => MedicalHistory, (medicalHistory: MedicalHistory) => medicalHistory.assignmentRequests, { primary: false } )
  medicalHistory: MedicalHistory;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({
    type: 'enum',
    name: 'assignment_request_status',
    enum: AssignmentRequestStatus,
    default: AssignmentRequestStatus.PENDING,
  })
  assignmentRequestStatus: AssignmentRequestStatus;

}
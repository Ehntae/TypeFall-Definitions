declare const CLIENT : boolean;
declare const SERVER : boolean;

declare function print(...messages: string[]): void;
declare function printTable(table: object): void;

declare function chip(): Entity;

// StarFall / hooks
declare namespace hook {
    /**
     * Used to attach named callbacks (hooks) to specific events (for event driven code execution)
     * @param eventName Name of the event to 'hook' the callback to
     * @param hookName Unique identifier for the hook being added
     * @param callback The function called whenever the event fires
     */
    function add(eventName: string, hookName: string, callback: Function): void;
    function remove(eventName: string, hookName: string): void;

}

// StarFall / render
declare namespace render {
    
}

declare interface IScreenVector {
    x: number,
    y: number,
    visible: true
}

/**
 * Starfall's Vector Type
 */
declare class Vector {
    public x: number;
    public y: number;
    public z?: number;

    public constructor(x: number, y: number, z?: number);

    public add(vector: Vector): void;
    public cross(vector: Vector): Vector;
    public div(vector: Vector): void;
    public dot(vector: Vector): number;
    public getAngle(): Angle;
    public getDistance(vector: Vector): number;
    public getDistanceSqr(vector: Vector): number;
    public getLength(): number;
    public getLength2D(): number;
    public getLengthSqr(): number;
    public getLength2DSqr(): number;
    public getNormalized(): Vector;
    public isEqualTol(vector: Vector, tolerance: Number): boolean;
    public isZero(): boolean;
    public mul(scalar: number): void;
    public normalize(): void;
    public rotate(angle: Angle): void;
    public rotateAroundAxis(axis: Vector, degrees: number, radians: number): Vector; // TODO: See what can be optionalized here.
    public set(vector: Vector): void;
    public setX(x: number): Vector;
    public setY(y: number): Vector;
    public setZ(z: number): Vector;
    public setZero(): void;
    public sub(vector: Vector): void;
    public toScreen(): IScreenVector;
    public vdiv(vector: Vector): void;
    public vmul(vector: Vector): void;
    public withinAABox(vector1: Vector, vector2: Vector): boolean;
}

/**
 * Starfall's Angle Type
 */
declare class Angle {
    public p: number;
    public y: number;
    public r: number;
    public pitch: number;
    public yaw: number;
    public roll: number;

    public constructor(pitch: number, yaw: number, roll: number);
    
    public getForward(): Vector
    public getNormalized(): Angle
    public getRight(): Vector
    public getUp(): Vector
    public isZero(): boolean
    public normalize(): void
    public rotateAroundAxis(axis: Vector, degrees: number, radians: number): Angle; // TODO: See what can be optionalized here.
    public set(angle: Angle): void;
    public setP(pitch: number): Angle;
    public setR(roll: number): Angle;
    public setY(yaw: number): Angle;
    public setZero(): void;
}

/**
 * Starfall's Bass Type
 */
declare class Bass {
    public getFFT(samples: number): number[];
    public getLength(): number;
    public getTime(): number;
    public isOnline(): true;
    public isValid(): true;
    public pause(): void;
    public play(): void;
    public setFade(min: number, max: number): void;
    public setLooping(loop: boolean): void;
    public setPitch(pitch: number): void;
    public setPos(pos: Vector): void;
    public setTime(time: number): void;
    public setVolume(volume: number): void;
    public stop(): void;
}

/**
 * Starfall's Color Type
 */
declare class Color {
    public r: number;
    public g: number;
    public b: number;
    public h: number;
    public s: number;
    public v: number;

    public constructor (r: number, g: number, b: number);

    public hsvToRGB(): Color;
    public rgbToHSV(): Color;
    public setA(a: number): Color;
    public setB(g: number): Color;
    public setG(b: number): Color;
    public setR(r: number): Color;
}

/*declare enum CHAN {
    REPLACE,
    AUTO,
    WEAPON,
    VOICE,
    ITEM,
    BODY,
    STREAM,
    STATIC,
    VOICE2,
    VOICE_BASE,
    USER_BASE
}*/

/**
 * Starfall's Entity Type
 */
declare class Entity {
    public addCollisionListener(callback: Function): void;
    public applyAngForce(angle: Angle): void;
    public applyDamage(damage: number, attacker: Entity, inflictor: Entity): void; // TODO: Verify that attacker and inflictor are, in fact, entities.
    public applyForceCenter(force: Vector): void;
    public applyForceOffset(force: Vector, offset: Vector): void;
    public applyTorque(torque: Vector): void;
    public breakEnt(): void;
    public emitSound(path: string, level?: number, pitch?: number, channel?: number): void; //TODO: clarify this by interrogating sfex devs
    public enableDrag(enable: boolean): void;
    public enableGravity(enable: boolean): void;
    public enableMotion(enable: boolean): void;
    public enableSphere(enable: boolean): void;
    public entIndex(): number;
    public extinguish(): void;
    public getAngles(): Angle;
    public getAngleVelocity(): Angle;
    public getAngleVelocityAngle(): Angle;
    public getAttachment(index: number): any; // TODO: Figure out how this function returns.
    public getAttachmentParent(): number;
    public getBoneCount(): number;
    public getBoneMatrix(index?: number): VMatrix;
    public getBoneName(bone?: number): string;
    public getBoneParent(bone?: number): string;
    public getBonePosition(bone?:number): any; // TODO: Figure out how this function returns.
    public getClass(): string;
    public getColor(): Color;
    public getEyeAngles(): Angle;
    public getEyePos(): Vector; // TODO: Figure out how this returns in the case of the entity being a ragdoll.
    public getForward(): Vector;
    public getHealth(): number;
    public getInertia(): Vector;
    public getMass(): number;
    public getMassCenter(): Vector;
    public getMassCenterW(): Vector;
    public getMaterial(): string;
    public getMaterials(): any; // TODO: Figure out what this returns.
    public getMaxHealth(): number;
    public getModel(): string;
    public getOwner(): Player;
    public getParent(): Entity;
    public getPhysicsObject(): PhysObj;
    public getPhysicsObjectCount(): number;
    public getPhysicsObjectNum(id: number): PhysObj;
    public getPhysMaterial(): string; // TODO: Verify this return type.
    public getPos(): Vector;
    public getRight(): Vector;
    public getSkin(): number;
    public getSubMaterial(index: number): string;
    public getUp(): Vector;
    public getVelocity(): Vector;
    public getWaterLevel(): number;
    public ignite(): void;
    public isFrozen(): boolean;
    public isNPC(): boolean;
    public isOnGround(): boolean;
    public isPlayer(): boolean;
    public isValid(): boolean;
    public isValidPhys(): boolean;
    public isVehicle(): boolean;
    public isWeapon(): boolean;
    public isWeldedTo(): boolean;
    public linkComponent(entity: Entity): void;
    public localToWorld(vector: Vector): Vector;
    public localToWorldAngles(angle: Angle): Angle;
    public lookupAttachment(name: string): number; // TODO: Verify the type of name.
    public lookupBone(name: string): number;
    public manipulateBoneAngles(id: number, ang: Angle): void;
    public manipulateBonePosition(id: number, pos: Vector): void;
    public manipulateBoneScale(id: number, pos: Vector): void;
    public obbCenter(): Vector;
    public obbCenterW(): Vector;
    public obbSize(): Vector;
    public remove(): void;
    public removeCollisionListener(): void;
    public removeTrails(): void;
    public setAngles(angle: Angle): void;
    public setBodygroup(id: number, value: number): void;
    public setColor(color: Color): void;
    public setDrawShadow(enable: boolean, player: Player): void;
    public setDrawShadow(enable: boolean, players: Player[]): void;
    public setFrozen(state: boolean): void;
    public setHologramMesh(mesh: Mesh): void;
    public setHologramRenderBounds(vector1: Vector, vector2: Vector): void;
    public setHologramRenderMatrix(matrix: VMatrix): void;
    public setInertia(inertia: Vector): void;
    public setMass(mass: Number): void;
    public setMaterial(material: string): void;
    public setNocollideAll(enable: boolean): void;
    public setNoDraw(disable: boolean): void;
    public setParent(parent: Entity, attachment?: string): void;
    public setPhysMaterial(material: string): void; // TODO: Verify that material is indeed a string
    public setPos(pos: Vector): void;
    public setRenderFX(renderfx: number): void;
    public setRenderMode(rendermode: number): void;
    public setSkin(index: number): void;
    public setSolid(solid: boolean): void;
    public setSubMaterial(index: number, material: string): void;
    public setTrails(startSize: number, endSize: number, length: number, material: string, color: Color, attachmentID?: number, additive?: boolean): void;
    public setVelocity(velocity: Vector): void;
    public translateBoneToPhysBone(id: number): number;
    public translatePhysBoneToBone(id: number): number;
    public unparent(): void; // ? Does this not take any argments? It doesn't according to the docs, anyways.
    public worldToLocal(vector: Vector): Vector;
    public worldToLocalAngles(angle: Angle): Angle;
}

/**
 * Stub VMatrix Class
 */
declare class VMatrix {
    // TODO: Populate Stub VMatrix Class
}

/**
 * Stub Player Class
 */
declare class Player {
    // TODO: Populate Stub Player Class
}

/**
 * Stub PhysObj Class
 */
declare class PhysObj {
    // TODO: Populate Stub PhysObj Class
}

/**
 * Starfall's Mesh Type
 */
declare class Mesh {
    // TODO: Verify that there isn't actually anything else that can be done to meshes.
    public destroy(): void;
    public draw(): void;
}
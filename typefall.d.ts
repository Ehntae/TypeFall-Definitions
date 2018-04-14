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
    function drawRect(x: number, y: number, width: number, height: number): void;
    function drawRectOutline(x: number, y: number, width: number, height: number): void;
    function drawRoundedBox(cornerRadius: number, x: number, y: number, width: number, height: number): void;
    function drawRoundedBoxEX(cornerRadius: number, x: number, y: number, width: number, height: number, 
        roundTopLeft: boolean, roundTopRight: boolean, roundBottomLeft: boolean, roundBottomRight: boolean): void;
    function drawSimpleText(x: number, y: number, text: string, xAlignment: any, yAlignment: any): void; //TODO: Figure out type
    function drawText(x: number, y: number, alignment: any): void; //TODO: Figure out type
    function setColor(color: IColor): void;
}

declare interface Filter {
    (ent: Entity) : boolean
}

declare namespace find {
    function all(filter: Filter): Entity[];
    function allPlayers(filter: Filter): Entity[];
    function byClass(className: string, filter: Filter): Entity[];
    function byModel(model: string, filter: Filter): Entity[];
    function inBox(corner1: IVector, corner2: IVector, filter: Filter): Entity[];
    function inCone(pos: IVector, direction: IVector, distance: number, radius: number, filter: Filter): Entity[]; // TODO: Confirm that direction is a Vector, not an Angle.
    function inSphere(center: IVector, radius: number, filter: Filter): Entity[];
}

declare interface IScreenIVector {
    x: number,
    y: number,
    visible: true
}

/**
 * Starfall's Vector Type
 */
declare function Vector(x?: number, y?: number, z?:number): IVector;

declare interface IVector {
    x?: number;
    y?: number;
    z?: number;

    add(IVector: IVector): void;
    cross(IVector: IVector): IVector;
    div(IVector: IVector): void;
    dot(IVector: IVector): number;
    getIAngle(): IAngle;
    getDistance(IVector: IVector): number;
    getDistanceSqr(IVector: IVector): number;
    getLength(): number;
    getLength2D(): number;
    getLengthSqr(): number;
    getLength2DSqr(): number;
    getNormalized(): IVector;
    isEqualTol(IVector: IVector, tolerance: Number): boolean;
    isZero(): boolean;
    mul(scalar: number): void;
    normalize(): void;
    rotate(IAngle: IAngle): void;
    rotateAroundAxis(axis: IVector, degrees: number, radians: number): IVector; // TODO: See what can be optionalized here.
    set(IVector: IVector): void;
    setX(x: number): IVector;
    setY(y: number): IVector;
    setZ(z: number): IVector;
    setZero(): void;
    sub(IVector: IVector): void;
    toScreen(): IScreenIVector;
    vdiv(IVector: IVector): void;
    vmul(IVector: IVector): void;
    withinAABox(IVector1: IVector, IVector2: IVector): boolean;
}

/**
 * Starfall's Angle Type
 */
declare function Angle(pitch: number, yaw:number, roll: number): IAngle;

declare class IAngle {
    public p: number;
    public y: number;
    public r: number;
    public pitch: number;
    public yaw: number;
    public roll: number;

    public constructor(pitch: number, yaw: number, roll: number);
    
    public getForward(): IVector
    public getNormalized(): IAngle
    public getRight(): IVector
    public getUp(): IVector
    public isZero(): boolean
    public normalize(): void
    public rotateAroundAxis(axis: IVector, degrees: number, radians: number): IAngle; // TODO: See what can be optionalized here.
    public set(IAngle: IAngle): void;
    public setP(pitch: number): IAngle;
    public setR(roll: number): IAngle;
    public setY(yaw: number): IAngle;
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
    public setPos(pos: IVector): void;
    public setTime(time: number): void;
    public setVolume(volume: number): void;
    public stop(): void;
}

/**
 * Starfall's Color Type
 */

declare function Color(red: number, green: number, blue: number, alpha?: number): IColor;

declare interface IColor {
    r: number;
    g: number;
    b: number;
    h: number;
    s: number;
    v: number;

    // constructor (r: number, g: number, b: number);

    hsvToRGB(): IColor;
    rgbToHSV(): IColor;
    setA(a: number): IColor;
    setB(g: number): IColor;
    setG(b: number): IColor;
    setR(r: number): IColor;
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
    public applyAngForce(IAngle: IAngle): void;
    public applyDamage(damage: number, attacker: Entity, inflictor: Entity): void; // TODO: Verify that attacker and inflictor are, in fact, entities.
    public applyForceCenter(force: IVector): void;
    public applyForceOffset(force: IVector, offset: IVector): void;
    public applyTorque(torque: IVector): void;
    public breakEnt(): void;
    public emitSound(path: string, level?: number, pitch?: number, channel?: number): void; //TODO: clarify this by interrogating sfex devs
    public enableDrag(enable: boolean): void;
    public enableGravity(enable: boolean): void;
    public enableMotion(enable: boolean): void;
    public enableSphere(enable: boolean): void;
    public entIndex(): number;
    public extinguish(): void;
    public getIAngles(): IAngle;
    public getIAngleVelocity(): IAngle;
    public getIAngleVelocityIAngle(): IAngle;
    public getAttachment(index: number): any; // TODO: Figure out how this function returns.
    public getAttachmentParent(): number;
    public getBoneCount(): number;
    public getBoneMatrix(index?: number): VMatrix;
    public getBoneName(bone?: number): string;
    public getBoneParent(bone?: number): string;
    public getBonePosition(bone?:number): any; // TODO: Figure out how this function returns.
    public getClass(): string;
    public getColor(): IColor;
    public getEyeIAngles(): IAngle;
    public getEyePos(): IVector; // TODO: Figure out how this returns in the case of the entity being a ragdoll.
    public getForward(): IVector;
    public getHealth(): number;
    public getInertia(): IVector;
    public getMass(): number;
    public getMassCenter(): IVector;
    public getMassCenterW(): IVector;
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
    public getPos(): IVector;
    public getRight(): IVector;
    public getSkin(): number;
    public getSubMaterial(index: number): string;
    public getUp(): IVector;
    public getVelocity(): IVector;
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
    public localToWorld(IVector: IVector): IVector;
    public localToWorldIAngles(IAngle: IAngle): IAngle;
    public lookupAttachment(name: string): number; // TODO: Verify the type of name.
    public lookupBone(name: string): number;
    public manipulateBoneIAngles(id: number, ang: IAngle): void;
    public manipulateBonePosition(id: number, pos: IVector): void;
    public manipulateBoneScale(id: number, pos: IVector): void;
    public obbCenter(): IVector;
    public obbCenterW(): IVector;
    public obbSize(): IVector;
    public remove(): void;
    public removeCollisionListener(): void;
    public removeTrails(): void;
    public setIAngles(IAngle: IAngle): void;
    public setBodygroup(id: number, value: number): void;
    public setColor(color: IColor): void;
    public setDrawShadow(enable: boolean, player: Player): void;
    public setDrawShadow(enable: boolean, players: Player[]): void;
    public setFrozen(state: boolean): void;
    public setHologramMesh(mesh: Mesh): void;
    public setHologramRenderBounds(IVector1: IVector, IVector2: IVector): void;
    public setHologramRenderMatrix(matrix: VMatrix): void;
    public setInertia(inertia: IVector): void;
    public setMass(mass: Number): void;
    public setMaterial(material: string): void;
    public setNocollideAll(enable: boolean): void;
    public setNoDraw(disable: boolean): void;
    public setParent(parent: Entity, attachment?: string): void;
    public setPhysMaterial(material: string): void; // TODO: Verify that material is indeed a string
    public setPos(pos: IVector): void;
    public setRenderFX(renderfx: number): void;
    public setRenderMode(rendermode: number): void;
    public setSkin(index: number): void;
    public setSolid(solid: boolean): void;
    public setSubMaterial(index: number, material: string): void;
    public setTrails(startSize: number, endSize: number, length: number, material: string, color: IColor, attachmentID?: number, additive?: boolean): void;
    public setVelocity(velocity: IVector): void;
    public translateBoneToPhysBone(id: number): number;
    public translatePhysBoneToBone(id: number): number;
    public unparent(): void; // ? Does this not take any argments? It doesn't according to the docs, anyways.
    public worldToLocal(IVector: IVector): IVector;
    public worldToLocalIAngles(IAngle: IAngle): IAngle;
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
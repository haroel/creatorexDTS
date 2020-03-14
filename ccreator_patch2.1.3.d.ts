
/**
 * 2019/12/03
 * author:  ihowe
 * email :  ihowe@outlook.com
 * 
 */

declare module cc {
    /**
     * Material
     */
    export interface Material extends Asset {
        /**
         * set Property value to Material
         * @param name 
         * @param value 
         */
        setProperty: (name: string, value: any) => void;

        getProperty: (name: string) => any;

        define: (name: string, val: any, force: boolean) => void;

        getDefine: (name: string) => any;

        setDirty: (dirty: boolean) => void;

        /**
         * 
         */
        getHash: () => string;
        /**
         * copy
         */
        copy: () => cc.Material;
    }

    export namespace sys {
        let localStorage: {
            /**
             * Gets an item from the JS.
             * @param lskey 
             */
            getItem(lskey: string): string;
            /** Sets an item in the JS. */
            setItem: (key: string, value: string) => void;
            /** removes an item from the LS */
            removeItem: (key: string) => void;
            /** gets an key from the JS. */
            key: (index: number) => string;
            /** removes all items from the LS */
            clear: () => void;
            /** gets all items count in the JS. */
            length: () => number;
        };
    }
}

declare namespace jsb {
    export module reflection {
        /**
         * https://docs.cocos.com/creator/manual/zh/advanced-topics/java-reflection.html
         * call OBJC/Java static methods
         * 
         * @param args 
         */
        export function callStaticMethod(...args): any;
    }
    /**
     * 下载任务对象
     */
    export type DownloaderTask = { requestURL: string, storagePath: string, identifier: string };

    /**
     * Http file downloader for jsb！
     */
    export class Downloader {
        /**
         * create a download task
         * @param url 
         * @param storagePath 
         * @param identifier 
         */
        createDownloadFileTask(url: string, storagePath: string, identifier?: string): DownloaderTask;

        setOnFileTaskSuccess(task: DownloaderTask): void;

        setOnTaskProgress(task: DownloaderTask, bytesReceived: number, totalBytesReceived: number, totalBytesExpected: number): void;

        setOnTaskError(task: DownloaderTask, errorCode, errorCodeInternal, errorStr): void;

    }

    /**
     * FileUtils  Helper class to handle file operations.
     */
    export module fileUtils {
        /**
         *  Checks whether the path is an absolute path.
         *
         *  @note On Android, if the parameter passed in is relative to "@assets/", this method will treat it as an absolute path.
         *        Also on Blackberry, path starts with "app/native/Resources/" is treated as an absolute path.
         *
         *  @param path The path that needs to be checked.
         *  @return True if it's an absolute path, false if not.
         */
        export function isAbsolutePath(path: string): boolean;
        /** Returns the fullpath for a given filename.

        First it will try to get a new filename from the "filenameLookup" dictionary.
        If a new filename can't be found on the dictionary, it will use the original filename.
        Then it will try to obtain the full path of the filename using the FileUtils search rules: resolutions, and search paths.
        The file search is based on the array element order of search paths and resolution directories.

        For instance:

            We set two elements("/mnt/sdcard/", "internal_dir/") to search paths vector by setSearchPaths,
            and set three elements("resources-ipadhd/", "resources-ipad/", "resources-iphonehd")
            to resolutions vector by setSearchResolutionsOrder. The "internal_dir" is relative to "Resources/".

            If we have a file named 'sprite.png', the mapping in fileLookup dictionary contains `key: sprite.png -> value: sprite.pvr.gz`.
            Firstly, it will replace 'sprite.png' with 'sprite.pvr.gz', then searching the file sprite.pvr.gz as follows:

                /mnt/sdcard/resources-ipadhd/sprite.pvr.gz      (if not found, search next)
                /mnt/sdcard/resources-ipad/sprite.pvr.gz        (if not found, search next)
                /mnt/sdcard/resources-iphonehd/sprite.pvr.gz    (if not found, search next)
                /mnt/sdcard/sprite.pvr.gz                       (if not found, search next)
                internal_dir/resources-ipadhd/sprite.pvr.gz     (if not found, search next)
                internal_dir/resources-ipad/sprite.pvr.gz       (if not found, search next)
                internal_dir/resources-iphonehd/sprite.pvr.gz   (if not found, search next)
                internal_dir/sprite.pvr.gz                      (if not found, return "sprite.png")

            If the filename contains relative path like "gamescene/uilayer/sprite.png",
            and the mapping in fileLookup dictionary contains `key: gamescene/uilayer/sprite.png -> value: gamescene/uilayer/sprite.pvr.gz`.
            The file search order will be:

                /mnt/sdcard/gamescene/uilayer/resources-ipadhd/sprite.pvr.gz      (if not found, search next)
                /mnt/sdcard/gamescene/uilayer/resources-ipad/sprite.pvr.gz        (if not found, search next)
                /mnt/sdcard/gamescene/uilayer/resources-iphonehd/sprite.pvr.gz    (if not found, search next)
                /mnt/sdcard/gamescene/uilayer/sprite.pvr.gz                       (if not found, search next)
                internal_dir/gamescene/uilayer/resources-ipadhd/sprite.pvr.gz     (if not found, search next)
                internal_dir/gamescene/uilayer/resources-ipad/sprite.pvr.gz       (if not found, search next)
                internal_dir/gamescene/uilayer/resources-iphonehd/sprite.pvr.gz   (if not found, search next)
                internal_dir/gamescene/uilayer/sprite.pvr.gz                      (if not found, return "gamescene/uilayer/sprite.png")

        If the new file can't be found on the file system, it will return the parameter filename directly.

        This method was added to simplify multiplatform support. Whether you are using cocos2d-js or any cross-compilation toolchain like StellaSDK or Apportable,
        you might need to load different resources for a given file in the different platforms.

        @since v2.1
        */
        export function fullPathForFilename(filename: string): string;
        /**
         *  Gets string from a file.
        */
        export function getStringFromFile(filename: string): string;
        /**
         *  Removes a file.
         *
         *  @param filepath The full path of the file, it must be an absolute path.
         *  @return True if the file have been removed successfully, false if not.
         */
        export function removeFile(filepath: string): boolean;
        /**
         *  Checks whether the path is a directory.
         *
         *  @param dirPath The path of the directory, it could be a relative or an absolute path.
         *  @return True if the directory exists, false if not.
         */
        export function isDirectoryExist(dirPath: string): boolean;
        /**
         * Normalize: remove . and ..
         * @param filepath 
         */
        export function normalizePath(filepath: string): string;
        /**
         * Get default resource root path.
         */
        export function getDefaultResourceRootPath(): string;
        /**
         * Loads the filenameLookup dictionary from the contents of a filename.
         *
         * @note The plist file name should follow the format below:
         *
         * @code
         * <?xml version="1.0" encoding="UTF-8"?>
         * <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
         * <plist version="1.0">
         * <dict>
         *     <key>filenames</key>
         *     <dict>
         *         <key>sounds/click.wav</key>
         *         <string>sounds/click.caf</string>
         *         <key>sounds/endgame.wav</key>
         *         <string>sounds/endgame.caf</string>
         *         <key>sounds/gem-0.wav</key>
         *         <string>sounds/gem-0.caf</string>
         *     </dict>
         *     <key>metadata</key>
         *     <dict>
         *         <key>version</key>
         *         <integer>1</integer>
         *     </dict>
         * </dict>
         * </plist>
         * @endcode
         * @param filename The plist file name.
         *
         @since v2.1
        * @js loadFilenameLookup
        * @lua loadFilenameLookup
        */
        export function loadFilenameLookup(filepath: string): void;
        /** Checks whether to pop up a message box when failed to load an image.
         *  @return True if pop up a message box when failed to load an image, false if not.
         */
        export function isPopupNotify(): boolean;
        /**
         *  Sets whether to pop-up a message box when failed to load an image.
         */
        export function setPopupNotify(notify: boolean): void;

        // Converts the contents of a file to a ValueVector.
        // This method is used internally.
        export function getValueVectorFromFile(filepath: string): Array<any>;
        /**
         *  Gets the array of search paths.
         *
         *  @return The array of search paths which may contain the prefix of default resource root path. 
         *  @note In best practise, getter function should return the value of setter function passes in.
         *        But since we should not break the compatibility, we keep using the old logic. 
         *        Therefore, If you want to get the original search paths, please call 'getOriginalSearchPaths()' instead.
         *  @see fullPathForFilename(const char*).
         *  @lua NA
         */
        export function getSearchPaths(filepath: string): Array<string>;
        /**
         * 
         * @param filepath 
         */
        export function getFileDir(filepath: string): string;
        /**
        * write a ValueMap into a plist file
        *
        *@param dict the ValueMap want to save (key,value)
        *@param fullPath The full path to the file you want to save a string
        *@return bool
        */
        export function writeToFile(valueMap: any): boolean;
        /**
         *  Gets the original search path array set by 'setSearchPaths' or 'addSearchPath'.
         *  @return The array of the original search paths
         */
        export function getOriginalSearchPaths(): Array<string>;
        /**
         *  List all files in a directory.
         *
         *  @param dirPath The path of the directory, it could be a relative or an absolute path.
         *  @return File paths in a string vector
         */
        export function listFiles(filepath: string): Array<string>;
        /**
         *  Converts the contents of a file to a ValueMap.
         *  @param filename The filename of the file to gets content.
         *  @return ValueMap of the file contents.
         *  @note This method is used internally.
         */
        export function getValueMapFromFile(filepath: string): any;
        /**
         *  Retrieve the file size.
         *
         *  @note If a relative path was passed in, it will be inserted a default root path at the beginning.
         *  @param filepath The path of the file, it could be a relative or absolute path.
         *  @return The file size.
         */
        export function getFileSize(filepath: string): number;

        /** Converts the contents of a file to a ValueMap.
         *  This method is used internally.
         */
        export function getValueMapFromData(filedata: string, filesize: number): any;
        /**
         *  Removes a directory.
         *
         *  @param dirPath  The full path of the directory, it must be an absolute path.
         *  @return True if the directory have been removed successfully, false if not.
         */
        export function removeDirectory(dirPath: string): boolean;
        /**
         *  Sets the array of search paths.
         *
         *  You can use this array to modify the search path of the resources.
         *  If you want to use "themes" or search resources in the "cache", you can do it easily by adding new entries in this array.
         *
         *  @note This method could access relative path and absolute path.
         *        If the relative path was passed to the vector, FileUtils will add the default resource directory before the relative path.
         *        For instance:
         *            On Android, the default resource root path is "@assets/".
         *            If "/mnt/sdcard/" and "resources-large" were set to the search paths vector,
         *            "resources-large" will be converted to "@assets/resources-large" since it was a relative path.
         *
         *  @param searchPaths The array contains search paths.
         *  @see fullPathForFilename(const char*)
         *  @since v2.1
         *  In js:var setSearchPaths(var jsval);
         *  @lua NA
         */
        export function setSearchPaths(searchPath: Array<string>): void;
        /**
         *  write a string into a file
         *
         * @param dataStr the string want to save
         * @param fullPath The full path to the file you want to save a string
         * @return bool True if write success
         */
        export function writeStringToFile(dataStr: string, fullPath: string): boolean;
        /**
         *  Sets the array that contains the search order of the resources.
         *
         *  @param searchResolutionsOrder The source array that contains the search order of the resources.
         *  @see getSearchResolutionsOrder(), fullPathForFilename(const char*).
         *  @since v2.1
         *  In js:var setSearchResolutionsOrder(var jsval)
         *  @lua NA
         */
        export function setSearchResolutionsOrder(searchResolutionsOrder: Array<string>): void;
        /**
         * Append search order of the resources.
         *
         * @see setSearchResolutionsOrder(), fullPathForFilename().
         * @since v2.1
         */
        export function addSearchResolutionsOrder(order: string, front: boolean): void;
        /**
         * Add search path.
         *
         * @since v2.1
         */
        export function addSearchPath(path: string, front: boolean): void;
        /**
        * write ValueVector into a plist file
        *
        *@param vecData the ValueVector want to save
        *@param fullPath The full path to the file you want to save a string
        *@return bool
        */
        export function writeValueVectorToFile(vecData: Array<any>, fullPath: string): boolean;
        /**
         *  Checks whether a file exists.
         *
         *  @note If a relative path was passed in, it will be inserted a default root path at the beginning.
         *  @param filename The path of the file, it could be a relative or absolute path.
         *  @return True if the file exists, false if not.
         */
        export function isFileExist(filename: string): boolean;
        /**©∫
         *  Purges full path caches.
         */
        export function purgeCachedEntries(): void;
        /**
     *  Gets full path from a file name and the path of the relative file.
     *  @param filename The file name.
     *  @param relativeFile The path of the relative file.
     *  @return The full path.
     *          e.g. filename: hello.png, pszRelativeFile: /User/path1/path2/hello.plist
     *               Return: /User/path1/path2/hello.pvr (If there a a key(hello.png)-value(hello.pvr) in FilenameLookup dictionary. )
     *
     */
        export function fullPathFromRelativeFile(filename: string, relativeFile: string): string;
        /**
        * Windows fopen can't support UTF-8 filename
        * Need convert all parameters fopen and other 3rd-party libs
        *
        * @param filenameUtf8 std::string name file for conversion from utf-8
        * @return std::string ansi filename in current locale
        */
        export function getSuitableFOpen(filenameUtf8: string): string;
        /**
        * write ValueMap into a plist file
        *
        *@param dict the ValueMap want to save
        *@param fullPath The full path to the file you want to save a string
        *@return bool
        */
        export function writeValueMapToFile(dict: any, fullPath: string): string;
        /**
        *  Gets filename extension is a suffix (separated from the base filename by a dot) in lower case.
        *  Examples of filename extensions are .png, .jpeg, .exe, .dmg and .txt.
        *  @param filePath The path of the file, it could be a relative or absolute path.
        *  @return suffix for filename in lower case or empty if a dot not found.
        */
        export function getFileExtension(filePath: string): string;
        /**
         *  Sets writable path.
         */
        export function setWritablePath(writablePath: string): void;
        /**
         * Set default resource root path.
         */
        export function setDefaultResourceRootPath(filepath: string): void;

        /**
         *  Gets the array that contains the search order of the resources.
         *
         *  @see setSearchResolutionsOrder(const std::vector<std::string>&), fullPathForFilename(const char*).
         *  @since v2.1
         *  @lua NA
         */
        export function getSearchResolutionsOrder(): Array<string>;
        /**
         *  Creates a directory.
         *
         *  @param dirPath The path of the directory, it must be an absolute path.
         *  @return True if the directory have been created successfully, false if not.
         */
        export function createDirectory(dirPath: string): string;
        /**
         *  List all files recursively in a directory.
         *
         *  @param dirPath The path of the directory, it could be a relative or an absolute path.
         *  @return File paths in a string vector
         */
        export function listFilesRecursively(dirPath: string, files: Array<string>): void;
        /**
         *  Gets the writable path.
         *  @return  The path that can be write/read a file in
         */
        export function getWritablePath(): string;

        /**
         * Gets a binary data object from a file, async off the main cocos thread.
         *
         * @param filename filepath for the data to be read. Can be relative or absolute path
         * @param callback Function that will be called when file is read. Will be called 
         * on the main cocos thread.
         */
        export function getDataFromFile(filename: string, callback: (ArrayBuffer) => void);
		/**
		 *  Creates binary data from a file.
		 *  @return A data object.
		 */
        export function getDataFromFile(filename: string): ArrayBuffer;
		/**
		 * write Data into a file
		 *
		 *@param data the data want to save
		 *@param fullPath The full path to the file you want to save a string
		 *@return bool
		 */
        export function writeDataToFile(data: ArrayBuffer, fullPath: string): boolean;
		/**
		* Write Data into a file, done async off the main cocos thread.
		*
		* Use this function if you need to write Data while not blocking the main cocos thread.
		*
		* This function takes Data by value on purpose, to leverage move sematics.
		* If you want to avoid a copy of your data, use std::move/std::forward if appropriate
		*
		*@param data The data that will be written to disk
		*@param fullPath The absolute file path that the data will be written to
		*@param callback The function that will be called when data is written to disk. This
		* function will be executed on the main cocos thread. It will have on boolean argument 
		* signifying if the write was successful.
		*/
        export function writeDataToFile(data: ArrayBuffer, fullPath: string, callback: (bool) => void);

    }
    // TODO: This is probably a bad idea to declare these as enums (since they clearly are not TS enums), but let's try it out and at least see if the values resolve properly
    export enum DiffType {
        ADDED,
        DELETED,
        MODIFIED
    }

    export enum DownloadState {
        UNSTARTED,
        DOWNLOADING,
        SUCCESSED,
        UNMARKED
    }

    export enum EventCode {
        ERROR_NO_LOCAL_MANIFEST,
        ERROR_DOWNLOAD_MANIFEST,
        ERROR_PARSE_MANIFEST,
        NEW_VERSION_FOUND,
        ALREADY_UP_TO_DATE,
        UPDATE_PROGRESSION,
        ASSET_UPDATED,
        ERROR_UPDATING,
        UPDATE_FINISHED,
        UPDATE_FAILED,
        ERROR_DECOMPRESS
    }

    export enum ErrorCode {
        CREATE_FILE,
        NETWORK,
        NO_NEW_VERSION,
        UNCOMPRESS
    }

    export enum State {
        UNINITED,
        UNCHECKED,
        PREDOWNLOAD_VERSION,
        DOWNLOADING_VERSION,
        VERSION_LOADED,
        PREDOWNLOAD_MANIFEST,
        DOWNLOADING_MANIFEST,
        MANIFEST_LOADED,
        NEED_UPDATE,
        READY_TO_UPDATE,
        UPDATING,
        UNZIPPING,
        UP_TO_DATE,
        FAIL_TO_UPDATE
    }

    /**
     * @class
     */
    //jsb.EventAssetsManager = cc.Class.extend(/** @lends jsb.EventAssetsManager# */{
    export class EventAssetsManager extends cc.Class {
        static ERROR_NO_LOCAL_MANIFEST = EventCode.ERROR_NO_LOCAL_MANIFEST;
        static ERROR_DOWNLOAD_MANIFEST = EventCode.ERROR_DOWNLOAD_MANIFEST;
        static ERROR_PARSE_MANIFEST = EventCode.ERROR_PARSE_MANIFEST;
        static NEW_VERSION_FOUND = EventCode.NEW_VERSION_FOUND;
        static ALREADY_UP_TO_DATE = EventCode.ALREADY_UP_TO_DATE;
        static UPDATE_PROGRESSION = EventCode.UPDATE_PROGRESSION;
        static ASSET_UPDATED = EventCode.ASSET_UPDATED;
        static ERROR_UPDATING = EventCode.ERROR_UPDATING;
        static UPDATE_FINISHED = EventCode.UPDATE_FINISHED;
        static UPDATE_FAILED = EventCode.UPDATE_FAILED;
        static ERROR_DECOMPRESS = EventCode.ERROR_DECOMPRESS;
        /**
         * @function EventAssetsManager
         * @constructor
         * @param {String} eventName
         * @param {AssetsManager} manager
         * @param {EventCode} code
         * @param {String} [assetId]
         * @param {String} [message]
         * @param {number} [curle_code]
         * @param {number} [curlm_code]
         */
        public constructor(
            eventName: string,
            manager: AssetsManager,
            code: EventCode,
            assetId?: string,
            message?: string,
            curle_code?: number,
            curlm_code?: number);

        /**
         * 
         * @return {AssetsManager}
         */
        public getAssetsManager(): AssetsManager;

        /**
         * 
         * @return {String}
         */
        public getAssetId(): string;

        /**
         * 
         * @return {int}
         */
        public getCURLECode(): number;

        /**
         * 
         * @return {String}
         */
        public getMessage(): string;

        /**
         * 
         * @return {int}
         */
        public getCURLMCode(): number;

        /**
         * 
         * @return {number}
         */
        public getPercentByFile(): number;

        /**
         * 
         * @return {EventCode}
         */
        public getEventCode(): EventCode;

        /**
         * 
         * @return {number}
         */
        public getPercent(): number;

        public getDownloadedFiles(): number

        public getTotalFiles(): number;

        public getTotalBytes(): number;

        public getDownloadedBytes(): number;

        public isResuming(): number;
    }

    /**
     * @class
     */
    export class EventListenerAssetsManager extends cc.Class {
        /**
         * @function init
         * @param {AssetsManager} assetsmanager
         * @param {function} callback
         * @return {boolean}
         */
        public init(assetsmanager: AssetsManager, callback: (mgr: EventAssetsManager) => void): boolean;

        /**
         * @function create
         * @param {AssetsManager} assetsmanager
         * @param {function} callback
         * @return {EventListenerAssetsManager}
         */
        public create(assetsmanager: AssetsManager, callback: (mgr: EventAssetsManager) => void): EventListenerAssetsManager;
    }

    /**
     * @class
     * jsb.AssetsManager is the native AssetsManager for your game resources or scripts.
     * please refer to this document to know how to use it: http://www.cocos2d-x.org/docs/manual/framework/html5/v3/assets-manager/en
     * Only available in JSB
     */
    export class AssetsManager extends cc.Class {
        /**
         * Gets the current update state.
         * @return {State}
         */
        public getState(): State;

        /**
         * Check out if there is a new version of manifest.
         * You may use this method before updating, then let user determine whether he wants to update resources.
         */
        public checkUpdate(): void;

        /**
         * Prepare the update process, this will cleanup download process flags, fill up download units with temporary manifest or remote manifest
         */
        public prepareUpdate(): void;

        /**
         * Gets storage path.
         * @return {String}
         */
        public getStoragePath(): string;

        /**
         * Update with the current local manifest.
         */
        public update(): void;

        /**
         * Function for retrieving the local manifest object
         * @return {jsb.Manifest}
         */
        public getLocalManifest(): Manifest;

        /**
         * Function for retrieving the remote manifest object
         * @return {jsb.Manifest}
         */
        public getRemoteManifest(): Manifest;

        /**
         * Reupdate all failed assets under the current AssetsManager context
         */
        public downloadFailedAssets(): void;

        /**
         * Create function for creating a new AssetsManager
         * @param {String}manifestUrl The url for the local manifest file
         * @param {String}storagePath The storage path for downloaded assets
         * @return {jsb.AssetsManager}
         */
        public create(manifestUrl: string, storagePath: string): AssetsManager;

        /**
         * Load a custom local manifest object, the local manifest must be loaded already.
         * You can only manually load local manifest when the update state is UNCHECKED, it will fail once the update process is began.
         * This API will do the following things:
         * 1. Reset storage path
         * 2. Set local storage
         * 3. Search for cached manifest and compare with the local manifest
         * 4. Init temporary manifest and remote manifest
         * If successfully load the given local manifest and inited other manifests, it will return true, otherwise it will return false
         * @param {jsb.Manifest}localManifest 
         * @param {String}storagePath 
         */
        public loadLocalManifest(localManifest: Manifest, storagePath: string): boolean;

        /**
         * Load a local manifest from url.
         * You can only manually load local manifest when the update state is UNCHECKED, it will fail once the update process is began.
         * This API will do the following things:
         * 1. Reset storage path
         * 2. Set local storage
         * 3. Search for cached manifest and compare with the local manifest
         * 4. Init temporary manifest and remote manifest
         * If successfully load the given local manifest and inited other manifests, it will return true, otherwise it will return false
         * @param {String}manifestUrl 
         */
        public loadLocalManifest(manifestUrl: string): boolean;

        /**
         * Load a custom remote manifest object, the manifest must be loaded already.
         * You can only manually load remote manifest when the update state is UNCHECKED and local manifest is already inited, it will fail once the update process is began.
         * @param {Manifest}remoteManifest 
         */
        public loadRemoteManifest(remoteManifest: Manifest): boolean;

        /**
         * Gets the current downloaded files count of the update, this will only be available after READY_TO_UPDATE state, under unknown states it will return 0 by default.
         */
        public getDownloadedFiles(): number;

        /**
         * Function for retrieving the max concurrent task count
         */
        public getMaxConcurrentTask(): number;

        /**
         * Gets the total files count to be downloaded of the update, this will only be available after READY_TO_UPDATE state, under unknown states it will return 0 by default.
         */
        public getTotalFiles(): number;

        /**
         * Gets the total byte size to be downloaded of the update, this will only be available after READY_TO_UPDATE state, under unknown states it will return 0 by default.
         */
        public getTotalBytes(): number;

        /**
         * Set the verification function for checking whether downloaded asset is correct, e.g. using md5 verification
         * @param callback
         */
        public setVerifyCallback(callback: (path: string, asset: ManifestAsset) => boolean): void;

        /**
         * Set the event callback for receiving update process events
         * @param eventCallback
         */
        public setEventCallback(callback: (eventAssetsManager: EventAssetsManager) => void): void;

        /**
         * Set the handle function for comparing manifests versions
         * @param callback
         */
        public setVersionCompareHandle(callback: (localVersion: string, remoteVersion: string) => number): void;

        /**
         * Gets the current downloaded byte size of the update, this will only be available after READY_TO_UPDATE state, under unknown states it will return 0 by default.
         */
        public getDownloadedBytes(): number;

        /**
         * Function for setting the max concurrent task count
         * @param max max task count
         */
        public setMaxConcurrentTask(max: number): void;

        /**
         * Gets whether the current download is resuming previous unfinished job, this will only be available after READY_TO_UPDATE state, under unknown states it will return false by default.
         */
        public isResuming(): boolean;

        /**
         * 
         * @param manifestUrl 
         * @param storagePath 
         */
        public constructor(manifestUrl: string, storagePath: string);

        /**
         * 
         * @param manifestUrl 
         * @param storagePath 
         * @param versionCompareHandle 
         */
        public constructor(manifestUrl: string, storagePath: string, versionCompareHandle: (localVersion: string, remoteVersion: string) => number);
    }

    /**
     * @class
     */
    export class Manifest extends cc.Class {
        /**
         * Gets remote manifest file url.
         * @return {String}
         */
        public getManifestFileUrl(): string;

        /**
         * Check whether the version informations have been fully loaded
         * @return {boolean}
         */
        public isVersionLoaded(): boolean;

        /**
         * Check whether the manifest have been fully loaded
         * @return {boolean}
         */
        public isLoaded(): boolean;

        /**
         * Gets remote package url.
         * @return {String}
         */
        public getPackageUrl(): string;

        /**
         * Gets manifest version.
         * @return {String}
         */
        public getVersion(): string;

        /**
         * Gets remote version file url.
         * @return {String}
         */
        public getVersionFileUrl(): string;

        /**
         * Get the manifest root path, normally it should also be the local storage path.
         */
        public getManifestRoot(): string;

        /**
         * Set whether the manifest is being updating
         * @param updating updating or not
         */
        public setUpdating(updating: boolean): void;

        /**
         * Parse the manifest file information into this manifest
         * @param manifestUrl url of the local manifest
         */
        public parseFile(manifestUrl: string): void;

        /**
         * Get whether the manifest is being updating
         */
        public isUpdating(): boolean;

        /**
         * Parse the manifest from json string into this manifest
         * @param {String}content content Json string content
         * @param {String}manifestRoot manifestRoot The root path of the manifest file (It should be local path, so that we can find assets path relative to the root path)
         */
        public parseJSONString(content: string, manifestRoot: string): void;

        /**
         * Get the search paths list related to the Manifest.
         */
        public getSearchPaths(): Array<string>;

        /**
         * 
         * @param manifestUrl 
         */
        public constructor(manifestUrl: string = '');

        /**
         * 
         * @param content 
         * @param manifestRoot 
         */
        public constructor(content: string, manifestRoot: string);
    }

    // TODO: I don't know the best way to represent this, because I can't find a reference in the C++ docs. Just do this for now, fix it later on.
    /**
     * jsb.reflection is a bridge to let you invoke Java static functions.
     * please refer to this document to know how to use it: http://www.cocos2d-x.org/docs/manual/framework/html5/v3/reflection/en
     * Only available on iOS/Mac/Android platform
     * @class
     * @name jsb.reflection
     */
    export namespace reflection {
        /**
         * @function
         */
        export function callStaticMethod(): void;
    }
}
